const config = require('@/config.js');
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import { morganMiddleware } from '@middlewares/morganMiddleware';
import errorMiddleware from '@middlewares/errorMiddleware';
import { IndexRoutes } from '@routes/index.route';
import { Logger } from '@utils/logger';
import { catchAllMiddleware } from '@middlewares/catchAllMiddleware';
import compression from 'compression';
import { createConnection } from 'typeorm';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;
  public dbConnectionName: string;

  public constructor() {
    console.log(config['db']['port']);
    this.app = express();
    this.port = config['port'] || 3000;
    this.env = config['env'] || 'development';
    this.dbConnectionName = config['db.connection_name'] || 'development';

    this.env !== 'testing' && this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      Logger.info(`=================================`);
      Logger.info(`======= ENV: ${this.env} =======`);
      Logger.info(`======= DB: ${this.dbConnectionName} =======`);
      Logger.info(`🚀 App listening on port ${this.port}`);
      Logger.info(`=================================`);
    });
  }

  private async connectToDatabase() {
    await createConnection(`${this.dbConnectionName}`);
  }

  private initializeMiddlewares() {
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());
    this.app.use(hpp());
    this.app.use(morganMiddleware);
  }

  private initializeRoutes() {
    this.app.use('/', new IndexRoutes().router);
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
    this.app.use(catchAllMiddleware);
  }
}

export default App;
