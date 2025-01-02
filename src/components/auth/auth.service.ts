import { dalUser, dalRefreshToken } from '@db/dal';
import { UserAttributesInput } from '@db/models';
import { AppError } from '@utils';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Tokens } from './auth.model';

export default {
  isEmailExists: async (email: string): Promise<boolean> => {
    const isEmailExists = await dalUser.isEmailExists(email);

    return isEmailExists;
  },
  register: async (payload: UserAttributesInput): Promise<Tokens> => {
    const userId = await insertUser(payload);
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);

    await saveRefreshToken(refreshToken, userId);

    return {
      accessToken,
      refreshToken
    }
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

    await saveRefreshToken(refreshToken, user.id);

    return {
      accessToken,
      refreshToken,
    };
  }
};

const generateAccessToken = (userId: string) =>
  jwt.sign({id: userId}, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1m' });

const generateRefreshToken = (userId: string) =>
  jwt.sign({id: userId}, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '5m' });

const saveRefreshToken = async (token: string, userId: string): Promise<void> => {
  await dalRefreshToken.saveRefreshToken({ token, userId });
};

const insertUser = async (payload: UserAttributesInput): Promise<string> => {
  const userId = await dalUser.create(payload);

  return userId;
};
