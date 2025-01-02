import { AppError } from '@utils';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { MyJwtTokenPayload } from 'src/models';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;

  if (accessToken === null) {
    throw new AppError('Unauthorized user.', StatusCodes.UNAUTHORIZED);
  }

  try {
    const jwtPayload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as MyJwtTokenPayload;

    if (jwtPayload) {
      req.userId = jwtPayload.userId;
    }

    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw new AppError('Access token expired.', StatusCodes.FORBIDDEN);
    }

    throw new AppError('Invalid token.', StatusCodes.FORBIDDEN);
  }
};

export default isAuthenticated;
