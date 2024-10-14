-- AlterTable
CREATE SEQUENCE companies_id_seq;
ALTER TABLE "Companies" ALTER COLUMN "id" SET DEFAULT nextval('companies_id_seq');
ALTER SEQUENCE companies_id_seq OWNED BY "Companies"."id";
