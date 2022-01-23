import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMembers1641564992435 implements MigrationInterface {
  name = 'CreateMembers1641564992435';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "members_entity" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "fullName" character varying NOT NULL DEFAULT '', "post" character varying NOT NULL DEFAULT '', "disciplines" character varying NOT NULL DEFAULT '', "education" character varying NOT NULL DEFAULT '', "qualification" character varying NOT NULL DEFAULT '', "academicDegree" character varying NOT NULL DEFAULT '', "specialties" character varying NOT NULL DEFAULT '', "advancedTraining" character varying NOT NULL DEFAULT '', "specGuardian" character varying NOT NULL DEFAULT '', "totalGuardian" character varying NOT NULL DEFAULT '', "avatar" character varying NOT NULL DEFAULT '', "publications" text NOT NULL, CONSTRAINT "PK_65c79cf781f8e00659381eb3d78" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "members_entity"`);
  }
}
