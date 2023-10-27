import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumn1697623135695 implements MigrationInterface {
    name = 'AddColumn1697623135695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "full_name" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "full_name"`);
    }

}
