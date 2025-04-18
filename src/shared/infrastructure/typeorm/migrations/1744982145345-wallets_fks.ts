import { MigrationInterface, QueryRunner } from "typeorm";

export class WalletsFks1744982145345 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "wallets"
            ADD CONSTRAINT "FK_wallets_user_id"
            FOREIGN KEY ("user_id")
            REFERENCES "users" ("id")
            ON DELETE RESTRICT
            ON UPDATE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "wallets"
            ADD CONSTRAINT "FK_wallets_bank_id"
            FOREIGN KEY ("bank_id")
            REFERENCES "banks" ("id")
            ON DELETE RESTRICT
            ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "wallets"
            DROP CONSTRAINT "FK_wallets_user_id"
        `);

        await queryRunner.query(`
            ALTER TABLE "wallets"
            DROP CONSTRAINT "FK_wallets_bank_id"
        `);
    }
}
