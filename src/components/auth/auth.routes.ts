import { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import AuthValidation from './auth.validation';
import AuthController from './auth.controller';
import { isAuthenticated } from '@middlewares';

const router = Router();

// POST /sign-up
router.post('/sign-up', AuthValidation, AuthController.signUp);

// POST /login
router.post('/login', AuthController.login);

// POST /logout
router.post('/logout', AuthController.logout);

// GET /secured - for testing purposes
router.get('/secured', isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json('ok!');
    } catch (err) {
        next(err);
    }
});

export { router as authRoutes };
