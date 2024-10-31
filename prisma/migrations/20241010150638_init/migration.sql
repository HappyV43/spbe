-- AlterTable
CREATE SEQUENCE allocations_id_seq;
ALTER TABLE "Allocations" ALTER COLUMN "id" SET DEFAULT nextval('allocations_id_seq');
ALTER SEQUENCE allocations_id_seq OWNED BY "Allocations"."id";
