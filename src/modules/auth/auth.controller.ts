import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

import AuthService from './auth.service';
import { UserAttributesInput } from '@db/models';
import authService from './auth.service';

export default {
  signUp: async (req: Request<{}, null, UserAttributesInput>, res: Response, next: NextFunction) => {
    try {
      const validation = validationResult(req);

      if (validation.isEmpty()) {
        const tokens = await AuthService.register(req.body);

        res
          .cookie('accessToken', tokens.accessToken, {
            httpOnly: true,
            maxAge: 60 * 1000,
          })
          .cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            maxAge: 60 * 5 * 1000,
          })
          .status(StatusCodes.CREATED)
          .send();
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({
          errors: validation.mapped(),
        });
      }
    } catch (err) {
      next(err);
    }
  },
  login: async (req: Request<{ userId: string }, null, UserAttributesInput>, res: Response, next: NextFunction) => {
    try {
      const { accessToken, refreshToken } = await AuthService.login(req.body);

      if (accessToken && refreshToken) {
        res
          .cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 60 * 1000,
          })
          .cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 60 * 5 * 1000,
          })
          .status(StatusCodes.OK)
          .send();
      }
    } catch (err) {
      next(err);
    }
  },
  refresh: async (req: Request<null, null, UserAttributesInput>, res: Response, next: NextFunction) => {
    try {
      const newAccessToken = AuthService.refresh(req.cookies.refreshToken);

      res
        .cookie('accessToken', newAccessToken, {
          httpOnly: true,
          maxAge: 60 * 1000,
        })
        .status(StatusCodes.OK)
        .send();
    } catch (err) {
      next(err);
    }
  },
  logout: async (req: Request<{ userId: string }>, res: Response, next: NextFunction) => {
    try {
      await authService.logout(req.userId);
      res.clearCookie('accessToken').clearCookie('refreshToken');
    } catch (err) {
      next(err);
    }

    res.status(StatusCodes.NO_CONTENT).send();
  },
};
