import { AppError } from '@utils';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface MyJwtTokenPayload extends JwtPayload {
    userId: string;
};

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (token === null) {
        throw new AppError('Unauthorized user.', StatusCodes.UNAUTHORIZED);
    }

    try {
        const jwtPayload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as MyJwtTokenPayload;

        if (jwtPayload) {
            req.userId = jwtPayload.userId;
        }
    
        next();
    } catch (err) {
        throw new AppError('Unauthorized user.', StatusCodes.UNAUTHORIZED);
    }
}

export default isAuthenticated;
