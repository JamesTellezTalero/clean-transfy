import { MigrationInterface, QueryRunner } from "typeorm";

export class Transfers1744983258248 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE transfers (
                id INT PRIMARY KEY,
                source_wallet_id INT NOT NULL,
                target_wallet_id INT NOT NULL,
                amount BIGINT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE transfers;`);
    }
}
