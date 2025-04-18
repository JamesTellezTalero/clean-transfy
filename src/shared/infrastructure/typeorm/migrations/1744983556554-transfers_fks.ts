import { MigrationInterface, QueryRunner } from "typeorm";

export class TransfersFks1744983556554 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "transfers"
            ADD CONSTRAINT "FK_transfers_source_wallet_id"
            FOREIGN KEY ("source_wallet_id")
            REFERENCES "wallets" ("id")
            ON DELETE RESTRICT
            ON UPDATE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "transfers"
            ADD CONSTRAINT "FK_transfers_target_wallet_id"
            FOREIGN KEY ("target_wallet_id")
            REFERENCES "wallets" ("id")
            ON DELETE RESTRICT
            ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "transfers"
            DROP CONSTRAINT "FK_transfers_source_wallet_id"
        `);

        await queryRunner.query(`
            ALTER TABLE "transfers"
            DROP CONSTRAINT "FK_transfers_target_wallet_id"
        `);
    }
}
