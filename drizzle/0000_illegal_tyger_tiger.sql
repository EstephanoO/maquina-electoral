CREATE TABLE "analysis" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_id" integer,
	"ai_analysis" json NOT NULL,
	"analyzed_at" timestamp DEFAULT now(),
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"platform" varchar(10) NOT NULL,
	"post_id" varchar(255) NOT NULL,
	"url" text NOT NULL,
	"content" text,
	"author" varchar(255),
	"published_at" timestamp,
	"scraped_at" timestamp DEFAULT now(),
	"metrics" json DEFAULT '{}',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "posts_post_id_unique" UNIQUE("post_id")
);
--> statement-breakpoint
ALTER TABLE "analysis" ADD CONSTRAINT "analysis_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_analysis_expires" ON "analysis" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "idx_analysis_post_id" ON "analysis" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX "idx_posts_url" ON "posts" USING btree ("url");--> statement-breakpoint
CREATE INDEX "idx_posts_platform" ON "posts" USING btree ("platform");