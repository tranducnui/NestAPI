import { MigrationInterface, QueryRunner } from "typeorm";

export class DeletefullNameColumn1697623480466 implements MigrationInterface {
    name = 'DeletefullNameColumn1697623480466'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "full_name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "full_name" character varying`);
    }

}
