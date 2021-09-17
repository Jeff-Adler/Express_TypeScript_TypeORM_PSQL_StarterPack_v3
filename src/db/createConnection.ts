const config = require('@/config.js');
import { createConnection, Connection } from 'typeorm';

export class dbConnection {
  constructor() {
    this.createConnection();
  }

  async createConnection() {
    const connection = await createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'test',
      password: 'test',
      database: 'test'
    });
  }
}
