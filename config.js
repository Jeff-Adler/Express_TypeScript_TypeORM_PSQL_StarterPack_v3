require('dotenv').config();
const convict = require('convict');

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8080,
    env: 'PORT',
    arg: 'port'
  },
  db: {
    connectionName: {
      doc: 'TypeORM connection name',
      format: String,
      default: 'development',
      env: 'CONNECTION_NAME'
    },
    host: {
      doc: 'Database host name/IP',
      format: '*',
      default: '127.0.0.1',
      env: 'DB_HOST'
    },
    port: {
      doc: 'Database port',
      format: 'port',
      default: 5432,
      env: 'DB_PORT'
    },
    username: {
      doc: 'Database username',
      format: String,
      default: '',
      env: 'DB_USERNAME'
    },
    password: {
      doc: 'Database password',
      format: String,
      default: '',
      env: 'DB_PASSWORD'
    },
    dbName: {
      doc: 'Database name',
      format: String,
      default: 'users',
      env: 'DB_NAME'
    }
  }
});

// Load environment dependent configuration
const env = config.get('env');

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config.getProperties();
