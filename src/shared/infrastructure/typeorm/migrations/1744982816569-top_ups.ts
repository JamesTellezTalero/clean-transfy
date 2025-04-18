import { MigrationInterface, QueryRunner } from "typeorm";

export class TopUps1744982816569 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE top_ups (
                id INT PRIMARY KEY,
                wallet_id INT NOT NULL,
                amount BIGINT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE top_ups;`);
    }
}
