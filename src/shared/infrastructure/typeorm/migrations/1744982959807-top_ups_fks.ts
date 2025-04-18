import { MigrationInterface, QueryRunner } from "typeorm";

export class TopUpsFks1744982959807 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "top_ups"
            ADD CONSTRAINT "FK_top_ups_wallet_id"
            FOREIGN KEY ("wallet_id")
            REFERENCES "wallets" ("id")
            ON DELETE RESTRICT
            ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "top_ups"
            DROP CONSTRAINT "FK_top_ups_wallet_id"
        `);
    }
}
