import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1727885308767 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          SET TIME ZONE 'America/Bogota';
          CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          DROP EXTENSION IF EXISTS "uuid-ossp";
        `);
    }
}
