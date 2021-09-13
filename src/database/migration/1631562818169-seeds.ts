import faker from 'faker';
import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';

export class seeds1631562818169 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('hit seed file');
    const dbConnection = getConnection('development');
    // Get all entities
    const entities = dbConnection.entityMetadatas;

    // Wipe database
    for (const entity of entities) {
      const repository = dbConnection.getRepository(entity.name);
      await repository.clear();
    }

    for (let i = 0; i < 20; i++) {
      const email = faker.internet.email();
      const password = faker.internet.password(8);
      await dbConnection.getRepository('user').save({ email, password });
      console.log('hit loop');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
