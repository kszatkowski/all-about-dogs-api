import { body } from 'express-validator';
import { DogBreed } from './dog-breed.model';

export default [
  body('name' as keyof DogBreed)
    .isString()
    .withMessage('Name should be string.')
    .bail()
    .isLength({
      min: 3,
      max: 32
    })
    .withMessage('Name should be between 3 to 32 characters.'),
  body('description' as keyof DogBreed)
    .notEmpty()
    .withMessage('Description should not be empty.')
    .bail()
    .isLength({
      max: 10000
    })
    .withMessage('The length of description must be 10000 characters or fewer.'),
  body('adaptability' as keyof DogBreed)
    .notEmpty()
    .withMessage('Adaptability should not be empty.')
    .bail()
    .isInt({
      min: 1,
      max: 5
    })
    .withMessage('Adaptability must be integer between 1 and 5.'),
  body('trainability' as keyof DogBreed)
    .notEmpty()
    .withMessage('Trainability should not be empty.')
    .bail()
    .isInt({
      min: 1,
      max: 5
    })
    .withMessage('Trainability must be integer between 1 and 5.')
];
