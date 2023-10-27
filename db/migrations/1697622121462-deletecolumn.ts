import { MigrationInterface, QueryRunner } from "typeorm";

export class Deletecolumn1697622121462 implements MigrationInterface {
    name = 'Deletecolumn1697622121462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "full_nameUpdate"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "full_nameUpdate" character varying`);
    }

}
