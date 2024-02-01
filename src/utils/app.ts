import 'dotenv/config';
import express from 'express';
import { dogBreedsRoutes, imagesRoutes } from '@components';
import { errorMiddleware } from '@middlewares';

export function createApp() {
  const app = express();
  app.use(express.json());

  app.use(dogBreedsRoutes);
  app.use(imagesRoutes);

  app.use(errorMiddleware);

  return app;
}
