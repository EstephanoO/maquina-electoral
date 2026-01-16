
// src/db/schema.ts
import { pgTable, serial, varchar, timestamp, jsonb, integer, foreignKey, index, text } from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  platform: varchar('platform', { length: 10 }).notNull(), // FB, IG, TT, SYS
  postId: varchar('post_id', { length: 255 }).unique().notNull(), // Original post ID
  url: text('url').notNull(),
  content: text('content'),
  author: varchar('author', { length: 255 }),
  publishedAt: timestamp('published_at', { mode: 'date' }),
  scrapedAt: timestamp('scraped_at').defaultNow(),
  metrics: jsonb('metrics').default('{}'), // {likes, comments, shares}
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (posts) => ({
  idxUrl: index('idx_posts_url').on(posts.url),
  idxPlatform: index('idx_posts_platform').on(posts.platform),
}));

export const analysis = pgTable('analysis', {
  id: serial('id').primaryKey(),
  postId: integer('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  aiAnalysis: jsonb('ai_analysis').notNull(), // {score, cat, brief, strategy, risks, community}
  analyzedAt: timestamp('analyzed_at').defaultNow(),
  expiresAt: timestamp('expires_at').notNull(), // Configurable by platform
  createdAt: timestamp('created_at').defaultNow(),
}, (analysis) => ({
  idxExpires: index('idx_analysis_expires').on(analysis.expiresAt),
  idxPostId: index('idx_analysis_post_id').on(analysis.postId),
}));
