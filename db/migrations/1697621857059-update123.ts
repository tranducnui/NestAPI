import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1231697621857059 implements MigrationInterface {
    name = 'Update1231697621857059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "full_name" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "full_name"`);
    }

}
