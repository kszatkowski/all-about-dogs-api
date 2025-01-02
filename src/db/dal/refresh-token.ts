import { RefreshToken, RefreshTokenAttributesInput } from '@db/models';

export const saveRefreshToken = async (payload: RefreshTokenAttributesInput): Promise<RefreshToken> => {
  const [refreshToken] = await RefreshToken.upsert(payload);

  return refreshToken;
};
