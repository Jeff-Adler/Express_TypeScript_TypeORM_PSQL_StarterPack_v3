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
    return createConnection({
      name: config['db']['connection_name'],
      type: 'postgres',
      host: config['db']['host'],
      port: config['db']['port'],
      username: config['db']['username'],
      password: config['db']['password'],
      database: config['db']['name']
    });
  }

  public getConnection() {
    return this.connection;
  }
}
