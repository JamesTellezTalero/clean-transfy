import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersFks1744981198913 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "users"
        ADD CONSTRAINT "FK_users_identification_type"
        FOREIGN KEY ("identification_type_id")
        REFERENCES "identification_types" ("id")
        ON DELETE RESTRICT
        ON UPDATE CASCADE
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "users"
        DROP CONSTRAINT "FK_users_identification_type"
    `);
    }
}
