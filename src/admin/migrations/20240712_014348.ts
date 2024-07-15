import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
    await payload.db.drizzle.execute(sql`
        DROP TABLE IF EXISTS "navbar" CASCADE;
        DROP TABLE IF EXISTS "footer" CASCADE;
        DROP TABLE IF EXISTS "code_of_conduct" CASCADE;
        DROP TABLE IF EXISTS "landing_title" CASCADE;
        DROP TABLE IF EXISTS "landing" CASCADE;
        DROP TABLE IF EXISTS "landing_rels" CASCADE;
        DROP TABLE IF EXISTS "stats" CASCADE;
    `);
};

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
    await payload.db.drizzle.execute(sql`
        CREATE TABLE IF NOT EXISTS "navbar" (
            "id" serial PRIMARY KEY NOT NULL,
            "title" varchar NOT NULL,
            "href" varchar NOT NULL,
            "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
            "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
        );

        CREATE TABLE IF NOT EXISTS "footer" (
            "id" serial PRIMARY KEY NOT NULL,
            "title" varchar NOT NULL,
            "href" varchar NOT NULL,
            "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
            "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
        );

        CREATE TABLE IF NOT EXISTS "code_of_conduct" (
            "id" serial PRIMARY KEY NOT NULL,
            "title" varchar NOT NULL,
            "content" jsonb NOT NULL,
            "slug" varchar,
            "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
            "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
        );

        CREATE TABLE IF NOT EXISTS "landing_title" (
            "_order" integer NOT NULL,
            "_parent_id" integer NOT NULL,
            "id" varchar PRIMARY KEY NOT NULL,
            "text" varchar
        );

        CREATE TABLE IF NOT EXISTS "landing" (
            "id" serial PRIMARY KEY NOT NULL,
            "subtitle" varchar NOT NULL,
            "description" varchar NOT NULL,
            "main_button" varchar NOT NULL,
            "main_button_link" varchar NOT NULL,
            "cta" varchar NOT NULL,
            "cta_link" varchar NOT NULL,
            "main_section_title" varchar NOT NULL,
            "main_section_subtitle" varchar NOT NULL,
            "main_section_content" jsonb NOT NULL,
            "main_section_image_id" integer NOT NULL,
            "stats_section_title" varchar NOT NULL,
            "stats_section_subtitle" varchar NOT NULL,
            "events_section_title" varchar NOT NULL,
            "events_section_subtitle" varchar NOT NULL,
            "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
            "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
        );

        CREATE TABLE IF NOT EXISTS "landing_rels" (
            "id" serial PRIMARY KEY NOT NULL,
            "order" integer,
            "parent_id" integer NOT NULL,
            "path" varchar NOT NULL,
            "stats_id" integer,
            "meetups_id" integer
        );

        CREATE TABLE IF NOT EXISTS "stats" (
            "id" serial PRIMARY KEY NOT NULL,
            "title" varchar NOT NULL,
            "subtitle" varchar NOT NULL,
            "count" numeric NOT NULL,
            "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
            "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
        );

        CREATE INDEX IF NOT EXISTS "navbar_created_at_idx" ON "navbar" ("created_at");
        CREATE INDEX IF NOT EXISTS "footer_created_at_idx" ON "footer" ("created_at");
        CREATE INDEX IF NOT EXISTS "code_of_conduct_created_at_idx" ON "code_of_conduct" ("created_at");
        CREATE INDEX IF NOT EXISTS "landing_title_order_idx" ON "landing_title" ("_order");
        CREATE INDEX IF NOT EXISTS "landing_title_parent_id_idx" ON "landing_title" ("_parent_id");
        CREATE INDEX IF NOT EXISTS "landing_created_at_idx" ON "landing" ("created_at");
        CREATE INDEX IF NOT EXISTS "landing_rels_order_idx" ON "landing_rels" ("order");
        CREATE INDEX IF NOT EXISTS "landing_rels_parent_idx" ON "landing_rels" ("parent_id");
        CREATE INDEX IF NOT EXISTS "landing_rels_path_idx" ON "landing_rels" ("path");
        CREATE INDEX IF NOT EXISTS "stats_created_at_idx" ON "stats" ("created_at");

        DO $$ BEGIN
            ALTER TABLE "landing_title" 
            ADD CONSTRAINT "landing_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "landing"("id") ON DELETE cascade ON UPDATE no action;
        EXCEPTION
            WHEN duplicate_object THEN null;
        END $$;

        DO $$ BEGIN
            ALTER TABLE "landing" 
            ADD CONSTRAINT "landing_main_section_image_id_media_id_fk" FOREIGN KEY ("main_section_image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
        EXCEPTION
            WHEN duplicate_object THEN null;
        END $$;

        DO $$ BEGIN
            ALTER TABLE "landing_rels" 
            ADD CONSTRAINT "landing_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "landing"("id") ON DELETE cascade ON UPDATE no action;
        EXCEPTION
            WHEN duplicate_object THEN null;
        END $$;

        DO $$ BEGIN
            ALTER TABLE "landing_rels" 
            ADD CONSTRAINT "landing_rels_stats_fk" FOREIGN KEY ("stats_id") REFERENCES "stats"("id") ON DELETE cascade ON UPDATE no action;
        EXCEPTION
            WHEN duplicate_object THEN null;
        END $$;

        DO $$ BEGIN
            ALTER TABLE "landing_rels" 
            ADD CONSTRAINT "landing_rels_meetups_fk" FOREIGN KEY ("meetups_id") REFERENCES "meetups"("id") ON DELETE cascade ON UPDATE no action;
        EXCEPTION
            WHEN duplicate_object THEN null;
        END $$;
    `);
};
