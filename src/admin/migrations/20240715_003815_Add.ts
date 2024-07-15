import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "meetups_rels" ADD COLUMN "media_id" integer;
DO $$ BEGIN
 ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`)
};

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "meetups_rels" DROP CONSTRAINT "meetups_rels_media_fk";

ALTER TABLE "meetups_rels" DROP COLUMN IF EXISTS "media_id";`)
};
