import { Router } from 'express';
import DogBreedController from './dog-breed.controller';
import DogBreedValidation from './dog-breed.validation';

const router = Router();

// GET /dog-breeds
router.get('/dog-breeds', DogBreedController.getAll);

// GET /dog-breeds/:id
router.get('/dog-breeds/:id', DogBreedController.get);

// POST /dog-breeds
router.post('/dog-breeds', DogBreedValidation, DogBreedController.create);

// PUT /dog-breeds/:id
router.put('/dog-breeds/:id', DogBreedValidation, DogBreedController.update);

// DELETE /dog-breeds/:id
router.delete('/dog-breeds/:id', DogBreedController.delete);

export { router as dogBreedsRoutes };
