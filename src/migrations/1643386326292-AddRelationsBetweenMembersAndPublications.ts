import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationsBetweenMembersAndPublications1643386326292
  implements MigrationInterface {
  name = 'AddRelationsBetweenMembersAndPublications1643386326292';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "publications" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "title" character varying NOT NULL, "body" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_2c4e732b044e09139d2f1065fae" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "members_entity_publications_publications" ("membersEntityId" integer NOT NULL, "publicationsId" integer NOT NULL, CONSTRAINT "PK_1f5c219e5c153feb9e310884cb2" PRIMARY KEY ("membersEntityId", "publicationsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cc63d8822313b96536e48d6a85" ON "members_entity_publications_publications" ("membersEntityId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cd70e1c6dab00a04fea0f6cd8b" ON "members_entity_publications_publications" ("publicationsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "members_entity" DROP COLUMN "publications"`,
    );
    await queryRunner.query(
      `ALTER TABLE "members_entity_publications_publications" ADD CONSTRAINT "FK_cc63d8822313b96536e48d6a853" FOREIGN KEY ("membersEntityId") REFERENCES "members_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "members_entity_publications_publications" ADD CONSTRAINT "FK_cd70e1c6dab00a04fea0f6cd8b6" FOREIGN KEY ("publicationsId") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "members_entity_publications_publications" DROP CONSTRAINT "FK_cd70e1c6dab00a04fea0f6cd8b6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "members_entity_publications_publications" DROP CONSTRAINT "FK_cc63d8822313b96536e48d6a853"`,
    );
    await queryRunner.query(
      `ALTER TABLE "members_entity" ADD "publications" text NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cd70e1c6dab00a04fea0f6cd8b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cc63d8822313b96536e48d6a85"`,
    );
    await queryRunner.query(
      `DROP TABLE "members_entity_publications_publications"`,
    );
    await queryRunner.query(`DROP TABLE "publications"`);
  }
}
