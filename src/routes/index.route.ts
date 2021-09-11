import { Router, Request, Response } from 'express';
import IndexController from '@controllers/index.controller';
import { Routes } from '@interfaces/routes.interface';
import { Logger } from '@utils/logger';
import { CatsRouter } from '@routes/cats.route';

export class IndexRoutes implements Routes {
  public path = '/';
  public router = Router();
  public controller = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.controller.index);

    // this.router.get('/logger', (_, res) => {
    //   Logger.error('This is an error log');
    //   Logger.warn('This is a warn log');
    //   Logger.info('This is a info log');
    //   Logger.http('This is a http log');
    //   Logger.debug('This is a debug log');

    //   res.send('Hello world');
    // });

    // this.router.use(`${this.path}cats`, new CatsRouter().router);
  }
}
