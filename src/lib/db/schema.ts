import { pgTable, serial, text, timestamp, json, varchar, integer, index } from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  platform: varchar('platform', { length: 10 }).notNull(), // FB, IG, TT, SYS
  postId: varchar('post_id', { length: 255 }).notNull().unique(),
  url: text('url').notNull(),
  content: text('content'),
  author: varchar('author', { length: 255 }),
  publishedAt: timestamp('published_at'),
  scrapedAt: timestamp('scraped_at').defaultNow(),
  metrics: json('metrics').default('{}'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  urlIdx: index('idx_posts_url').on(table.url),
  platformIdx: index('idx_posts_platform').on(table.platform),
}));

export const analysis = pgTable('analysis', {
  id: serial('id').primaryKey(),
  postId: integer('post_id').references(() => posts.id, { onDelete: 'cascade' }),
  aiAnalysis: json('ai_analysis').notNull(),
  analyzedAt: timestamp('analyzed_at').defaultNow(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  expiresIdx: index('idx_analysis_expires').on(table.expiresAt),
  postIdIdx: index('idx_analysis_post_id').on(table.postId),
}));

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type Analysis = typeof analysis.$inferSelect;
export type NewAnalysis = typeof analysis.$inferInsert;