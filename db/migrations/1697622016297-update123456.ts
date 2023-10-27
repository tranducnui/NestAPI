import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1234561697622016297 implements MigrationInterface {
    name = 'Update1234561697622016297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "full_name" TO "full_nameUpdate"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "full_nameUpdate" TO "full_name"`);
    }

}
