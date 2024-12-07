import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import AuthService from './auth.service';
import { UserAttributesInput } from '@db/models';

export default {
  signUp: async (req: Request<{}, null, UserAttributesInput>, res: Response, next: NextFunction) => {
    try {
      const validation = validationResult(req);

      if (validation.isEmpty()) {
        const result = await AuthService.insert(req.body);

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
  login: async (req: Request<{ userId: string; }, null, UserAttributesInput>, res: Response, next: NextFunction) => {
    try {
      const accessToken = await AuthService.login(req.body);

      if (accessToken) {
        res
          .cookie('jwt', accessToken, {
            httpOnly: true,
            maxAge: 60 * 1000
          })
          .status(StatusCodes.OK)
          .send();
      }
    } catch (err) {
      next(err);
    }
  },
  logout: async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('jwt');

    res.status(StatusCodes.NO_CONTENT).send();
  }
};
