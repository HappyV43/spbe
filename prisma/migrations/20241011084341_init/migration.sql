-- AlterTable
CREATE SEQUENCE lpgdistributions_id_seq;
ALTER TABLE "LpgDistributions" ALTER COLUMN "id" SET DEFAULT nextval('lpgdistributions_id_seq');
ALTER SEQUENCE lpgdistributions_id_seq OWNED BY "LpgDistributions"."id";
