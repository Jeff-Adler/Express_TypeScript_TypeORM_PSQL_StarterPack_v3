import { Router, Request, Response } from 'express';
import { Routes } from '../interfaces/routes.interface';

export class CatsRouter implements Routes {
  public path = '/';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, (req: Request, res: Response) => {
      return res.status(200).send('Cool cat!');
    });
  }
}
