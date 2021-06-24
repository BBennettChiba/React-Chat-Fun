import {MigrationInterface, QueryRunner} from "typeorm";

export class addedContentToMessage1624184238540 implements MigrationInterface {
    name = 'addedContentToMessage1624184238540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" ADD "content" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "content"`);
    }

}
