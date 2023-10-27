import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1697611880212 implements MigrationInterface {
    name = 'CreateDatabase1697611880212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profiles" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "age" integer NOT NULL, "address" character varying NOT NULL, "occupation" character varying NOT NULL, "deleted_at" TIMESTAMP, "user_id" integer, CONSTRAINT "REL_9e432b7df0d182f8d292902d1a" UNIQUE ("user_id"), CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "hash" character varying NOT NULL, "deleted_at" TIMESTAMP, "profile_id" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_23371445bd80cb3e413089551b" UNIQUE ("profile_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "statuses" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying, "link" character varying NOT NULL, "deleted_at" TIMESTAMP, "user_id" integer, CONSTRAINT "PK_2fd3770acdb67736f1a3e3d5399" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "statuses_emojis" ("id" SERIAL NOT NULL, "status_id" integer NOT NULL, "emoji_id" integer NOT NULL, "deleted_at" TIMESTAMP, CONSTRAINT "PK_42f968896d3dec34ef841785ad2" PRIMARY KEY ("id", "status_id", "emoji_id"))`);
        await queryRunner.query(`CREATE TABLE "emojis" ("id" SERIAL NOT NULL, "react_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "deleted_at" TIMESTAMP, CONSTRAINT "PK_9adb96a675f555c6169bad7ba62" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_23371445bd80cb3e413089551bf" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "statuses" ADD CONSTRAINT "FK_95fcdbc022b0ee9c4fb645504b0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "statuses_emojis" ADD CONSTRAINT "FK_83283cb9146d9b22d63ebe9f591" FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "statuses_emojis" ADD CONSTRAINT "FK_9a5df87cec79990eafbadc314c7" FOREIGN KEY ("emoji_id") REFERENCES "emojis"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "statuses_emojis" DROP CONSTRAINT "FK_9a5df87cec79990eafbadc314c7"`);
        await queryRunner.query(`ALTER TABLE "statuses_emojis" DROP CONSTRAINT "FK_83283cb9146d9b22d63ebe9f591"`);
        await queryRunner.query(`ALTER TABLE "statuses" DROP CONSTRAINT "FK_95fcdbc022b0ee9c4fb645504b0"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_23371445bd80cb3e413089551bf"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2"`);
        await queryRunner.query(`DROP TABLE "emojis"`);
        await queryRunner.query(`DROP TABLE "statuses_emojis"`);
        await queryRunner.query(`DROP TABLE "statuses"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
    }

}
