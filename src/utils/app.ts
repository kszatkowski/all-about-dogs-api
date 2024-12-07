import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { dogBreedsRoutes, imagesRoutes, authRoutes } from '@components';
import { errorMiddleware } from '@middlewares';
import cookieParser from 'cookie-parser';

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());

  app.use(cors());
  app.use(dogBreedsRoutes);
  app.use(imagesRoutes);
  app.use(authRoutes);

  app.use(errorMiddleware);

  return app;
}
