import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1744981190895 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL PRIMARY KEY,
                "username" VARCHAR(100) NOT NULL,
                "password" VARCHAR(100),
                "uuid" UUID NOT NULL DEFAULT uuid_generate_v4() UNIQUE,
                "status" BOOLEAN DEFAULT TRUE,
                "first_name" VARCHAR(100) NOT NULL,
                "middle_name" VARCHAR(100),
                "last_name" VARCHAR(100) NOT NULL,
                "second_last_name" VARCHAR(100),
                "identification_number" VARCHAR(50) NOT NULL,
                "identification_type_id" INT NOT NULL,
                "email" VARCHAR(255) NOT NULL,
                "phone" VARCHAR(20),
                "address" TEXT,
                "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Add index for common searches
        await queryRunner.query(`
            CREATE INDEX "IDX_users_username_and_email_and_identification " ON "users" ("username", "email", "identification_number");
            CREATE INDEX "IDX_users_identification_and_identification_type" ON "users" ("identification_number", "identification_type_id");
            CREATE INDEX "IDX_users_username" ON "users" ("username");
            CREATE INDEX "IDX_users_identification" ON "users" ("identification_number");
            CREATE INDEX "IDX_users_identification_type" ON "users" ("identification_type_id");
            CREATE INDEX "IDX_users_email" ON "users" ("email");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop indexes first
        await queryRunner.query(`
            DROP INDEX IF EXISTS "IDX_users_username_and_email_and_identification";
            DROP INDEX IF EXISTS "IDX_users_identification_and_identification_type";
            DROP INDEX IF EXISTS "IDX_users_username";
            DROP INDEX IF EXISTS "IDX_users_identification";
            DROP INDEX "IDX_users_identification_type";
            DROP INDEX IF EXISTS "IDX_users_email";
        `);

        // Drop the table
        await queryRunner.query(`
            DROP TABLE IF EXISTS "users"
        `);
    }
}
