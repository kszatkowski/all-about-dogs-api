import { AppError } from '@utils';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorMiddleware = (error: AppError | Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    const { httpStatusCode, message } = error;

    res.status(httpStatusCode).json({
      error: message
    });
  } else {
    const { message, stack } = error;

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message,
      stack
    });
  }
};

export default errorMiddleware;
