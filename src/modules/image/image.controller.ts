import { NextFunction, Request, Response } from 'express';
import ImageService from './image.service';
import { StatusCodes } from 'http-status-codes';
import { ImageAttributes, ImageAttributesInput } from '@db/models';

export default {
  upload: async (req: Request<unknown, ImageAttributes, ImageAttributesInput>, res: Response, next: NextFunction) => {
    try {
      const filename = req.file!.filename;
      const dogBreedId = req.body.dogBreedId;
      const result = await ImageService.create({ filename, dogBreedId });

      res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
      next(err);
    }
  }
};
