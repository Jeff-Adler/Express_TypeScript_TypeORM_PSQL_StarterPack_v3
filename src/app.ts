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
  public dbConnectionType: string;

  public constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';
    this.dbConnectionType = process.env.TYPEORM_CONNECTION_TYPE || 'development';

    this.env !== 'testing' && this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      Logger.info(`=================================`);
      Logger.info(`======= ENV: ${this.env} =======`);
      Logger.info(`======= DB: ${this.dbConnectionType} =======`);
      Logger.info(`🚀 App listening on port ${this.port}`);
      Logger.info(`=================================`);
    });
  }

  private async connectToDatabase() {
    await createConnection(`${this.dbConnectionType}`);
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
