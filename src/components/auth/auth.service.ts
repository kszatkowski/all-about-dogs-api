import { dalUser } from '@db/dal';
import { UserAttributesInput } from '@db/models';
import { AppError } from '@utils';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {
  insert: async (payload: UserAttributesInput): Promise<string> => {
    const result = await dalUser.create(payload);

    return result;
  },
  isEmailExists: async (email: string): Promise<boolean> => {
    const isEmailExists = await dalUser.isEmailExists(email);

    return isEmailExists;
  },
  login: async (payload: UserAttributesInput): Promise<string> => {
    const user = await dalUser.get(payload.email);

    if (!user) {
      throw new AppError('Incorrect username or password.', StatusCodes.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(payload.password, user.password);

    if (!isPasswordValid) {
      throw new AppError('Incorrect username or password.', StatusCodes.UNAUTHORIZED);
    }

    const accessToken = generateAccessToken(user);

    return accessToken;
  }
};

const generateAccessToken = (user: UserAttributesInput) => jwt.sign({id: user.id}, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1m' });
const generateRefreshToken = (user: UserAttributesInput) => jwt.sign({id: user.id}, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '5m' });
