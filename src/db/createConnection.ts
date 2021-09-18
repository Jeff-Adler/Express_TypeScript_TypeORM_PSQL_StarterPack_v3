const config = require('@/config.js');
import { createConnection, Connection } from 'typeorm';

export class dbConnection {
  private connection!: Connection;

  private constructor() {}

  public static CreateDbConnection = async () => {
    const dbConnection = new dbConnection();

    dbConnection.connection = await dbConnection.CreateConnection();

    return dbConnection;
  };

  private async CreateConnection() {
    //TODO: replace with .get method
    const { connection_name, host, port, username, password, name } = config['db'];
    return createConnection({
      type: 'postgres',
      name: connection_name,
      host: host,
      port: port,
      username: username,
      password: password,
      database: name,
      synchronize: true,
      logging: false,
      entities: ['src/entity/*.entity.ts'],
      migrations: ['src/migration/*.ts'],
      migrationsRun: true,
      cli: {
        migrationsDir: 'src/migration'
      }
    });
  }

  public getConnection() {
    return this.connection;
  }
}
