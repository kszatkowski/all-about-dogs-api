import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { dalUser, dalRefreshToken } from '@db/dal';
import { UserAttributesInput } from '@db/models';
import { AppError } from '@utils';
import { Tokens } from './auth.model';
import { MyJwtTokenPayload } from '@models';

export default {
  isEmailExists: async (email: string): Promise<boolean> => {
    const isEmailExists = await dalUser.isEmailExists(email);

    return isEmailExists;
  },
  register: async (payload: UserAttributesInput): Promise<Tokens> => {
    const userId = await dalUser.create(payload);
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);

    await dalRefreshToken.saveRefreshToken({ token: refreshToken, userId });

    return {
      accessToken,
      refreshToken,
    };
  },
  login: async (payload: UserAttributesInput): Promise<Tokens> => {
    const user = await dalUser.get(payload.email);

    if (!user) {
      throw new AppError('Incorrect username or password.', StatusCodes.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(payload.password, user.password);

    if (!isPasswordValid) {
      throw new AppError('Incorrect username or password.', StatusCodes.UNAUTHORIZED);
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await dalRefreshToken.saveRefreshToken({ token: refreshToken, userId: user.id });

    return {
      accessToken,
      refreshToken,
    };
  },
  refresh: (refreshToken: string): string => {
    console.log('refreshToken', refreshToken);

    if (!refreshToken) {
      throw new AppError('Unauthorized user.', StatusCodes.UNAUTHORIZED);
    }

    try {
      const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as MyJwtTokenPayload;
      const newAccessToken = jwt.sign({ userId: payload.userId }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1m' });

      return newAccessToken;
    } catch (err) {
      throw new AppError('Invalid refresh token.', StatusCodes.UNAUTHORIZED);
    }
  },
  logout: async (userId?: string): Promise<void> => {
    try {
      if (!userId) {
        throw new AppError('Unauthorized user.', StatusCodes.UNAUTHORIZED);
      }

      await dalRefreshToken.removeRefreshToken(userId);
    } catch (err) {
      throw new AppError('Invalid refresh token.', StatusCodes.UNAUTHORIZED);
    }
  },
};

const generateAccessToken = (userId: string) => jwt.sign({ userId: userId }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1m' });

const generateRefreshToken = (userId: string) => jwt.sign({ userId: userId }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '5m' });
