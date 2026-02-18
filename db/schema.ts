import { pgTable, uuid, varchar, integer, timestamp, numeric, pgEnum, jsonb, boolean, text } from "drizzle-orm/pg-core";

export const categoryEnum = pgEnum("category", [
  "Engines and Transmissions",
  "Suspension",
  "Wheels and Tires",
  "Body Panels",
  "Accessories",
  "Other",
]);

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  make: varchar("make", { length: 255 }).notNull(),
  model: jsonb("model").$type<string[]>().notNull(),
  category: categoryEnum("category").notNull(),
  year: integer("year").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  price: numeric("price").notNull(),
  description: text("description").notNull(),
  inStock: boolean("in_stock").default(true).notNull(),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const analyticsEvents = pgTable("analytics_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventType: varchar("event_type", { length: 50 }).notNull(),
  productId: uuid("product_id"),
  meta: jsonb("meta"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
