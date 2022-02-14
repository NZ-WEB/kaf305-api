import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHomePageTopNews1644839498139 implements MigrationInterface {
  name = 'AddHomePageTopNews1644839498139';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "home_page_top_news_entity" ("id" SERIAL NOT NULL, "title" character varying NOT NULL DEFAULT '', "text" character varying NOT NULL DEFAULT '', "icon" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_5ef0d573bb04b4900a15d5dfedd" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "home_page_top_news_entity"`);
  }
}
