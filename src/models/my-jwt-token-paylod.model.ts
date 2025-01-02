import { JwtPayload } from 'jsonwebtoken';

export interface MyJwtTokenPayload extends JwtPayload {
  userId: string;
}
