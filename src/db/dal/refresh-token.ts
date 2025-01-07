import { RefreshToken, RefreshTokenAttributesInput } from '@db/models';
import { AppError } from '@utils';
import { StatusCodes } from 'http-status-codes';

export const saveRefreshToken = async (payload: RefreshTokenAttributesInput): Promise<RefreshToken> => {
  const [refreshToken] = await RefreshToken.upsert(payload);

  return refreshToken;
};

export const removeRefreshToken = async (userId: string): Promise<void> => {
  const deletedCount = await RefreshToken.destroy({
    where: {
      userId,
    },
  });

  if (!deletedCount) {
    throw new AppError('Refresh token not found.', StatusCodes.NOT_FOUND);
  }
};
