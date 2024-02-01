import { Router } from 'express';
import ImageController from './image.controller';
import { fileUpload } from '@middlewares'

const router = Router();

// POST /image
router.post('/image', fileUpload.single('file'), ImageController.upload);

export { router as imagesRoutes };
