import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "sponsors" RENAME COLUMN "description" TO "website";
ALTER TABLE "sponsors" ALTER COLUMN "website" SET DATA TYPE varchar;
ALTER TABLE "meetups_rels" ADD COLUMN "sponsors_id" integer;
DO $$ BEGIN
 ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_sponsors_fk" FOREIGN KEY ("sponsors_id") REFERENCES "sponsors"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`)
};

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "sponsors" RENAME COLUMN "website" TO "description";
ALTER TABLE "meetups_rels" DROP CONSTRAINT "meetups_rels_sponsors_fk";

ALTER TABLE "sponsors" ALTER COLUMN "description" SET DATA TYPE jsonb;
ALTER TABLE "meetups_rels" DROP COLUMN IF EXISTS "sponsors_id";`)
};
