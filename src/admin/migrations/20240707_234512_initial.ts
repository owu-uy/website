import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 DO $$ BEGIN
 CREATE TYPE "enum_locations_resources" AS ENUM('chairs', 'tv');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"thumbnail_u_r_l" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"focal_x" numeric,
	"focal_y" numeric,
	"sizes_thumbnail_url" varchar,
	"sizes_thumbnail_width" numeric,
	"sizes_thumbnail_height" numeric,
	"sizes_thumbnail_mime_type" varchar,
	"sizes_thumbnail_filesize" numeric,
	"sizes_thumbnail_filename" varchar,
	"sizes_card_url" varchar,
	"sizes_card_width" numeric,
	"sizes_card_height" numeric,
	"sizes_card_mime_type" varchar,
	"sizes_card_filesize" numeric,
	"sizes_card_filename" varchar,
	"sizes_tablet_url" varchar,
	"sizes_tablet_width" numeric,
	"sizes_tablet_height" numeric,
	"sizes_tablet_mime_type" varchar,
	"sizes_tablet_filesize" numeric,
	"sizes_tablet_filename" varchar
);

CREATE TABLE IF NOT EXISTS "sponsors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" jsonb,
	"logo_id" integer NOT NULL,
	"slug" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "agenda" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"rich_text" jsonb,
	"start_time" timestamp(3) with time zone,
	"end_time" timestamp(3) with time zone,
	"location_id" integer,
	"presenter_id" integer,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "agenda_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"members_id" integer
);

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

CREATE TABLE IF NOT EXISTS "communities" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"picture_id" integer NOT NULL,
	"slack" varchar,
	"linkedin" varchar,
	"github" varchar,
	"website" varchar,
	"slug" varchar,
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

CREATE TABLE IF NOT EXISTS "members" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstname" varchar NOT NULL,
	"lastname" varchar,
	"picture_id" integer,
	"jobtitle" varchar,
	"slackprofile" varchar,
	"linkedin" varchar,
	"github" varchar,
	"website" varchar,
	"slug" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "meetups" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"location" varchar NOT NULL,
	"start" timestamp(3) with time zone NOT NULL,
	"end" timestamp(3) with time zone NOT NULL,
	"banner_id" integer NOT NULL,
	"slug" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "meetups_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"members_id" integer,
	"communities_id" integer
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

CREATE TABLE IF NOT EXISTS "locations_resources" (
	"order" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"value" "enum_locations_resources",
	"id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "locations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"capacity" numeric NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric,
	"lock_until" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" ("filename");
CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" ("sizes_thumbnail_filename");
CREATE INDEX IF NOT EXISTS "media_sizes_card_sizes_card_filename_idx" ON "media" ("sizes_card_filename");
CREATE INDEX IF NOT EXISTS "media_sizes_tablet_sizes_tablet_filename_idx" ON "media" ("sizes_tablet_filename");
CREATE INDEX IF NOT EXISTS "sponsors_created_at_idx" ON "sponsors" ("created_at");
CREATE INDEX IF NOT EXISTS "agenda_created_at_idx" ON "agenda" ("created_at");
CREATE INDEX IF NOT EXISTS "agenda_rels_order_idx" ON "agenda_rels" ("order");
CREATE INDEX IF NOT EXISTS "agenda_rels_parent_idx" ON "agenda_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "agenda_rels_path_idx" ON "agenda_rels" ("path");
CREATE INDEX IF NOT EXISTS "navbar_created_at_idx" ON "navbar" ("created_at");
CREATE INDEX IF NOT EXISTS "footer_created_at_idx" ON "footer" ("created_at");
CREATE INDEX IF NOT EXISTS "communities_created_at_idx" ON "communities" ("created_at");
CREATE INDEX IF NOT EXISTS "code_of_conduct_created_at_idx" ON "code_of_conduct" ("created_at");
CREATE INDEX IF NOT EXISTS "members_created_at_idx" ON "members" ("created_at");
CREATE INDEX IF NOT EXISTS "meetups_created_at_idx" ON "meetups" ("created_at");
CREATE INDEX IF NOT EXISTS "meetups_rels_order_idx" ON "meetups_rels" ("order");
CREATE INDEX IF NOT EXISTS "meetups_rels_parent_idx" ON "meetups_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "meetups_rels_path_idx" ON "meetups_rels" ("path");
CREATE INDEX IF NOT EXISTS "landing_title_order_idx" ON "landing_title" ("_order");
CREATE INDEX IF NOT EXISTS "landing_title_parent_id_idx" ON "landing_title" ("_parent_id");
CREATE INDEX IF NOT EXISTS "landing_created_at_idx" ON "landing" ("created_at");
CREATE INDEX IF NOT EXISTS "landing_rels_order_idx" ON "landing_rels" ("order");
CREATE INDEX IF NOT EXISTS "landing_rels_parent_idx" ON "landing_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "landing_rels_path_idx" ON "landing_rels" ("path");
CREATE INDEX IF NOT EXISTS "stats_created_at_idx" ON "stats" ("created_at");
CREATE INDEX IF NOT EXISTS "locations_resources_order_idx" ON "locations_resources" ("order");
CREATE INDEX IF NOT EXISTS "locations_resources_parent_idx" ON "locations_resources" ("parent_id");
CREATE INDEX IF NOT EXISTS "locations_created_at_idx" ON "locations" ("created_at");
CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" ("key");
CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" ("order");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" ("path");
CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" ("created_at");
DO $$ BEGIN
 ALTER TABLE "sponsors" ADD CONSTRAINT "sponsors_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "agenda" ADD CONSTRAINT "agenda_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "agenda" ADD CONSTRAINT "agenda_presenter_id_members_id_fk" FOREIGN KEY ("presenter_id") REFERENCES "members"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "agenda_rels" ADD CONSTRAINT "agenda_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "agenda"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "agenda_rels" ADD CONSTRAINT "agenda_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "members"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "communities" ADD CONSTRAINT "communities_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "members" ADD CONSTRAINT "members_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "meetups" ADD CONSTRAINT "meetups_banner_id_media_id_fk" FOREIGN KEY ("banner_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "meetups"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "members"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_communities_fk" FOREIGN KEY ("communities_id") REFERENCES "communities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "landing_title" ADD CONSTRAINT "landing_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "landing"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "landing" ADD CONSTRAINT "landing_main_section_image_id_media_id_fk" FOREIGN KEY ("main_section_image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "landing_rels" ADD CONSTRAINT "landing_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "landing"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "landing_rels" ADD CONSTRAINT "landing_rels_stats_fk" FOREIGN KEY ("stats_id") REFERENCES "stats"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "landing_rels" ADD CONSTRAINT "landing_rels_meetups_fk" FOREIGN KEY ("meetups_id") REFERENCES "meetups"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "locations_resources" ADD CONSTRAINT "locations_resources_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "locations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`)
};

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 DROP TABLE "media";
DROP TABLE "sponsors";
DROP TABLE "agenda";
DROP TABLE "agenda_rels";
DROP TABLE "navbar";
DROP TABLE "footer";
DROP TABLE "communities";
DROP TABLE "code_of_conduct";
DROP TABLE "members";
DROP TABLE "meetups";
DROP TABLE "meetups_rels";
DROP TABLE "landing_title";
DROP TABLE "landing";
DROP TABLE "landing_rels";
DROP TABLE "stats";
DROP TABLE "locations_resources";
DROP TABLE "locations";
DROP TABLE "users";
DROP TABLE "payload_preferences";
DROP TABLE "payload_preferences_rels";
DROP TABLE "payload_migrations";`)
};
