CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"email" TEXT NOT NULL,
	"hashedPassword" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "applications" (
	"applicationId" serial NOT NULL,
	"userId" integer NOT NULL,
	"who" TEXT NOT NULL,
	"what" TEXT NOT NULL,
	"when" TEXT NOT NULL,
	"where" TEXT NOT NULL,
	"why" TEXT NOT NULL,
	"how" TEXT NOT NULL,
	"status" TEXT NOT NULL,
	"isChecked" BOOLEAN NOT NULL,
	CONSTRAINT "applications_pk" PRIMARY KEY ("applicationId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "applications" ADD CONSTRAINT "applications_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
