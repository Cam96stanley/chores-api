CREATE TYPE "public"."chore_assignment_status" AS ENUM('pending', 'submitted', 'completed');--> statement-breakpoint
CREATE TYPE "public"."family_member_role" AS ENUM('parent', 'child');--> statement-breakpoint
CREATE TYPE "public"."token_transaction_type" AS ENUM('earned', 'spent', 'adjustment');--> statement-breakpoint
CREATE TABLE "chore_assignment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"status" "chore_assignment_status" DEFAULT 'pending' NOT NULL,
	"due_date" timestamp with time zone NOT NULL,
	"submitted_at" timestamp with time zone,
	"approved_at" timestamp with time zone,
	"family_member_id" uuid NOT NULL,
	"chore_id" uuid NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "chores" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar,
	"token_amount" integer NOT NULL,
	"frequency" integer NOT NULL,
	"family_id" uuid NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "families" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "family_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role" "family_member_role" NOT NULL,
	"family_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "shop_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar,
	"token_cost" integer NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"family_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shop_redemptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"token_cost" integer NOT NULL,
	"family_member_id" uuid NOT NULL,
	"shop_item_id" uuid NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "token_transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"amount" integer NOT NULL,
	"type" "token_transaction_type" NOT NULL,
	"family_member_id" uuid NOT NULL,
	"chore_assignment_id" uuid NOT NULL,
	"shop_redemption_id" uuid NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "chore_assignment" ADD CONSTRAINT "chore_assignment_family_member_id_family_members_id_fk" FOREIGN KEY ("family_member_id") REFERENCES "public"."family_members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chore_assignment" ADD CONSTRAINT "chore_assignment_chore_id_chores_id_fk" FOREIGN KEY ("chore_id") REFERENCES "public"."chores"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chores" ADD CONSTRAINT "chores_family_id_families_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."families"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_members" ADD CONSTRAINT "family_members_family_id_families_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."families"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_members" ADD CONSTRAINT "family_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shop_items" ADD CONSTRAINT "shop_items_family_id_families_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."families"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shop_redemptions" ADD CONSTRAINT "shop_redemptions_family_member_id_family_members_id_fk" FOREIGN KEY ("family_member_id") REFERENCES "public"."family_members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shop_redemptions" ADD CONSTRAINT "shop_redemptions_shop_item_id_shop_items_id_fk" FOREIGN KEY ("shop_item_id") REFERENCES "public"."shop_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "token_transactions" ADD CONSTRAINT "token_transactions_family_member_id_family_members_id_fk" FOREIGN KEY ("family_member_id") REFERENCES "public"."family_members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "token_transactions" ADD CONSTRAINT "token_transactions_chore_assignment_id_chore_assignment_id_fk" FOREIGN KEY ("chore_assignment_id") REFERENCES "public"."chore_assignment"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "token_transactions" ADD CONSTRAINT "token_transactions_shop_redemption_id_shop_redemptions_id_fk" FOREIGN KEY ("shop_redemption_id") REFERENCES "public"."shop_redemptions"("id") ON DELETE no action ON UPDATE no action;