import { NextFunction, Request, Response } from 'express';
import DogBreedService from './dog-breed.service';
import { StatusCodes } from 'http-status-codes';
import { DogBreed, GetAllDogBreedsQueryParams, GetAllResponse } from './dog-breed.model';
import { ContentTypes } from '@utils/enums';
import { validationResult } from 'express-validator';

export default {
  getAll: async (req: Request<null, null, null, GetAllDogBreedsQueryParams>, res: Response<GetAllResponse>, next: NextFunction) => {
    try {
      const result = await DogBreedService.getAll(req.query);

      res.setHeader('Content-Type', ContentTypes.applicationJson).json(result);
    } catch (err) {
      next(err);
    }
  },
  get: async (req: Request<{ id: number }>, res: Response<DogBreed>, next: NextFunction) => {
    try {
      const result = await DogBreedService.get(req.params.id);

      res.setHeader('Content-Type', ContentTypes.applicationJson).json(result);
    } catch (err) {
      next(err);
    }
  },
  create: async (req: Request<{}, {}, DogBreed>, res: Response<number | {}>, next: NextFunction) => {
    try {
      const validation = validationResult(req);

      if (validation.isEmpty()) {
        const result = await DogBreedService.insert(req.body);

        res.status(StatusCodes.CREATED).json(result);
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({
          errors: validation.mapped()
        });
      }
    } catch (err) {
      next(err);
    }
  },
  update: async (req: Request<{ id: number }, {}, DogBreed>, res: Response, next: NextFunction) => {
    try {
      const validation = validationResult(req);

      if (validation.isEmpty()) {
        const { id } = req.params;
        await DogBreedService.update(id, req.body);

        res.status(StatusCodes.NO_CONTENT).end();
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({
          errors: validation.mapped()
        });
      }
    } catch (err) {
      next(err);
    }
  },
  delete: async (req: Request<{ id: number }, {}, DogBreed>, res: Response, next: NextFunction) => {
    try {
      await DogBreedService.delete(req.params.id);

      res.setHeader('Content-Type', ContentTypes.applicationJson).status(StatusCodes.NO_CONTENT).end();
    } catch (err) {
      next(err);
    }
  }
};
