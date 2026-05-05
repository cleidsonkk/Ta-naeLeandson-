CREATE TABLE "convidados" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"google_name" text,
	"google_photo" text,
	"nome_convidado" text,
	"presente_id" uuid,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "convidados_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "presentes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" text NOT NULL,
	"descricao" text,
	"imagem_url" text NOT NULL,
	"escolhido" boolean DEFAULT false NOT NULL,
	"categoria" text NOT NULL,
	"ordem" integer DEFAULT 0 NOT NULL,
	"escolhido_por" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "convidados" ADD CONSTRAINT "convidados_presente_id_presentes_id_fk" FOREIGN KEY ("presente_id") REFERENCES "public"."presentes"("id") ON DELETE no action ON UPDATE no action;