import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 CREATE TABLE IF NOT EXISTS "la_meetup_2024_gallery" (
	"id" serial PRIMARY KEY NOT NULL,
	"image_id" integer,
	"alt" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "la_meetup_2024_gallery_created_at_idx" ON "la_meetup_2024_gallery" ("created_at");
DO $$ BEGIN
 ALTER TABLE "la_meetup_2024_gallery" ADD CONSTRAINT "la_meetup_2024_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`)
};

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 DROP TABLE "la_meetup_2024_gallery";`)
};
