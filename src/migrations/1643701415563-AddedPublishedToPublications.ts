import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedPublishedToPublications1643701415563
  implements MigrationInterface {
  name = 'AddedPublishedToPublications1643701415563';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "publications" ADD "published" character varying NOT NULL DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "publications" DROP COLUMN "published"`,
    );
  }
}
