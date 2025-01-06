import { UserAttributes } from '@db/models';

export type User = UserAttributes;

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};
