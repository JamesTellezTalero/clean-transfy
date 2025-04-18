import { MigrationInterface, QueryRunner } from "typeorm";

export class Wallets1744981350925 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE wallets (
                id SERIAL PRIMARY KEY,
                "uuid" UUID NOT NULL DEFAULT uuid_generate_v4() UNIQUE,
                user_id INT NOT NULL,
                bank_id INT NOT NULL,
                balance BIGINT NOT NULL,
                status BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE wallets;`);
    }
}
