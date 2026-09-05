import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  whatsappMessage: text('whatsapp_message'),
});

export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  price: real('price').notNull(),
  sizes: text('sizes').notNull(), // JSON string array
  category: text('category').notNull().references(() => categories.slug),
  r2ImageUrl: text('r2_image_url').notNull(),
  createdAt: integer('created_at').notNull(),
});

export const settings = sqliteTable('settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
});
