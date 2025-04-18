import { MigrationInterface, QueryRunner } from "typeorm";

export class IdentificactionTypes1744981193913 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE identification_types (
                id INT PRIMARY KEY,
                name VARCHAR(55) NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE identification_types;`);
    }
}
