import { body } from 'express-validator';

import { User } from './auth.model';
import AuthService from './auth.service';

export default [
  body('email' as keyof User)
    .notEmpty()
    .withMessage('Email should not be empty.')
    .bail()
    .isEmail()
    .withMessage('Please provide correct email address.')
    .custom(async (email: string) => {
      const isEmailExists = await AuthService.isEmailExists(email);

      if (isEmailExists) {
        throw new Error('This e-mail address already exists.');
      }
    }),
  body('password' as keyof User)
    .notEmpty()
    .withMessage('Password should not be empty.'),
];
