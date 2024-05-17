import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { dogBreedsRoutes, imagesRoutes } from '@components';
import { errorMiddleware } from '@middlewares';
import dbInit from '../db/init';

export function createApp() {
  dbInit();
  const app = express();
  app.use(express.json());

  app.use(cors());
  app.use(dogBreedsRoutes);
  app.use(imagesRoutes);

  app.use(errorMiddleware);

  return app;
}
