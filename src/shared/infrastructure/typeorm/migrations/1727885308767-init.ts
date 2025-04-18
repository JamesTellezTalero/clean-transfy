import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1727885308767 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          SET TIME ZONE 'America/Bogota';
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
