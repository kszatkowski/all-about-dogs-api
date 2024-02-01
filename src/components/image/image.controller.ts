import { NextFunction, Request, Response } from 'express';
import ImageService from './image.service';
import { StatusCodes } from 'http-status-codes';

export default {
  upload: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filename = req.file!.filename;
      const result = await ImageService.upload(filename);

      res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
      next(err);
    }
  }
};
