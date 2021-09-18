const config = require('@/config.js');
import { createConnection, Connection } from 'typeorm';

export class dbConnection {
  constructor() {
    this.createConnection();
  }

  async createConnection() {
    const connection = await createConnection({
      name: config['db']['connection_name'],
      type: 'postgres',
      host: config['db']['host'],
      port: config['db']['port'],
      username: config['db']['username'],
      password: config['db']['password'],
      database: config['db']['name']
    });
  }
}
