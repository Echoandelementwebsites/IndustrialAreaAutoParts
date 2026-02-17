"use server";

import { db } from "@/lib/db";
import { products, analyticsEvents } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkIsAdmin } from "@/lib/auth";
import { logger } from "@/lib/logger";

export async function trackEvent(
  eventType: string,
  productId?: string,
  meta?: Record<string, unknown>
) {
  try {
    await db.insert(analyticsEvents).values({
      eventType,
      productId,
      meta,
    });
    logger.info(`Tracked event: ${eventType}`, { productId, meta });
  } catch (error) {
    logger.error("Failed to track event", { eventType, productId, meta, error: String(error) });
    // Don't throw, tracking should be best-effort
  }
}

export async function createProduct(formData: FormData) {
  try {
    const isAdmin = await checkIsAdmin();
    if (!isAdmin) throw new Error("Unauthorized");

    const name = formData.get("name") as string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const category = formData.get("category") as any;
    const make = formData.get("make") as string;
    const modelStr = formData.get("model") as string;
    const year = Number(formData.get("year"));
    const price = formData.get("price") as string;
    const quantity = Number(formData.get("quantity"));
    const imageUrl = formData.get("imageUrl") as string;

    const model = modelStr.split(",").map(m => m.trim()).filter(m => m);

    await db.insert(products).values({
      name,
      category,
      make,
      model,
      year,
      price,
      quantity,
      imageUrl,
    });

    logger.info("Product created", { name, make, model });
  } catch (e) {
    logger.error("Failed to create product", { error: String(e) });
    throw e; // Re-throw to show error to user if handled by UI, or let Next.js handle it
  }

  revalidatePath("/products");
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function updateProduct(formData: FormData) {
  const id = formData.get("id") as string;
  try {
    const isAdmin = await checkIsAdmin();
    if (!isAdmin) throw new Error("Unauthorized");

    const name = formData.get("name") as string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const category = formData.get("category") as any;
    const make = formData.get("make") as string;
    const modelStr = formData.get("model") as string;
    const year = Number(formData.get("year"));
    const price = formData.get("price") as string;
    const quantity = Number(formData.get("quantity"));
    const imageUrl = formData.get("imageUrl") as string;

    const model = modelStr.split(",").map(m => m.trim()).filter(m => m);

    await db.update(products).set({
      name,
      category,
      make,
      model,
      year,
      price,
      quantity,
      imageUrl,
    }).where(eq(products.id, id));

    logger.info("Product updated", { id, name });
  } catch (e) {
    logger.error("Failed to update product", { id, error: String(e) });
    throw e;
  }

  revalidatePath("/products");
  revalidatePath(`/products/${id}`);
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function deleteProduct(formData: FormData) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  await db.delete(products).where(eq(products.id, id));

  revalidatePath("/products");
  revalidatePath("/dashboard");
}
