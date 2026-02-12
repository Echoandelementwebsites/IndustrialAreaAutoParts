"use server";

import { db } from "@/lib/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkIsAdmin } from "@/lib/auth";

export async function createProduct(formData: FormData) {
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

  revalidatePath("/products");
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function updateProduct(formData: FormData) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) throw new Error("Unauthorized");

  const id = formData.get("id") as string;
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
