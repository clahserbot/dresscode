import { pgTable, text, bigint, doublePrecision } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  whatsappMessage: text('whatsapp_message'),
});

export const products = pgTable('products', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  price: doublePrecision('price').notNull(),
  sizes: text('sizes').notNull(), // JSON string array
  category: text('category').notNull().references(() => categories.slug),
  r2ImageUrl: text('r2_image_url').notNull(),
  createdAt: bigint('created_at', { mode: 'number' }).notNull(),
});

export const settings = pgTable('settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
});

