import { AppError } from '@utils';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload, JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

interface MyJwtTokenPayload extends JwtPayload {
    userId: string;
};

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
        if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError) {
            const refreshToken = req.cookies.refreshToken;
            console.log('refreshToken', refreshToken);

            if (!refreshToken) {
                throw new AppError('Unauthorized user.', StatusCodes.UNAUTHORIZED);
            }

            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as MyJwtTokenPayload;

            const newAccessToken = jwt.sign({id: decoded.userId}, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1m' });
            res.cookie('accessToken', newAccessToken, {
              httpOnly: true,
              maxAge: 60 * 1000,
            });
            return next();
        }

        throw new AppError('Unauthorized user.', StatusCodes.UNAUTHORIZED);
    }
}

export default isAuthenticated;
