import {MigrationInterface, QueryRunner} from "typeorm";

export class first1624610496768 implements MigrationInterface {
    name = 'first1624610496768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "userId" uuid, "chatRoomId" uuid, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat_room" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_8aa3a52cf74c96469f0ef9fbe3e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_chatrooms_chat_room" ("userId" uuid NOT NULL, "chatRoomId" uuid NOT NULL, CONSTRAINT "PK_59bbbce1cee8edc96dc37902468" PRIMARY KEY ("userId", "chatRoomId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fcc905296b4b5b38b92492cdfc" ON "user_chatrooms_chat_room" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_442d8c1afd0862f7fb986b5fb8" ON "user_chatrooms_chat_room" ("chatRoomId") `);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_446251f8ceb2132af01b68eb593" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_f3cc0ca0c4b191410f1e0ab5d21" FOREIGN KEY ("chatRoomId") REFERENCES "chat_room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_chatrooms_chat_room" ADD CONSTRAINT "FK_fcc905296b4b5b38b92492cdfc3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_chatrooms_chat_room" ADD CONSTRAINT "FK_442d8c1afd0862f7fb986b5fb89" FOREIGN KEY ("chatRoomId") REFERENCES "chat_room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_chatrooms_chat_room" DROP CONSTRAINT "FK_442d8c1afd0862f7fb986b5fb89"`);
        await queryRunner.query(`ALTER TABLE "user_chatrooms_chat_room" DROP CONSTRAINT "FK_fcc905296b4b5b38b92492cdfc3"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_f3cc0ca0c4b191410f1e0ab5d21"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_446251f8ceb2132af01b68eb593"`);
        await queryRunner.query(`DROP INDEX "IDX_442d8c1afd0862f7fb986b5fb8"`);
        await queryRunner.query(`DROP INDEX "IDX_fcc905296b4b5b38b92492cdfc"`);
        await queryRunner.query(`DROP TABLE "user_chatrooms_chat_room"`);
        await queryRunner.query(`DROP TABLE "chat_room"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "message"`);
    }

}
