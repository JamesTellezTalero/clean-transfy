import { MigrationInterface, QueryRunner } from "typeorm";

export class Banks1744980632612 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE banks (
                id SERIAL PRIMARY KEY,
                name VARCHAR(65) NOT NULL,
                code VARCHAR(6) NOT NULL,
                status BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE banks;`);
    }
}
