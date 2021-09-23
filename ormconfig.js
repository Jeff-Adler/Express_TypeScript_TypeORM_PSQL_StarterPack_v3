const config = require('@/config.js');

const { host, port, username, password, name } = config.get('db');

// This file is only to enable the TypeORM migrations. config.js should be used for app initialization.
module.exports = [
  {
    type: 'postgres',
    name: 'default',
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
  }
];
