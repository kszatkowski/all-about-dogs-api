import { AppError } from '@utils';
import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import multer, { FileFilterCallback, Options, diskStorage } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

function generateFilename(orginalFilename: string): string {
  const fileExtension = extname(orginalFilename);

  return `${uuidv4()}${fileExtension}`;
}

const storage = diskStorage({
  destination(req: Request, file: Express.Multer.File, done: (error: Error | null, destination: string) => void) {
    const uploadPath = 'public/';

    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath);
    }

    done(null, uploadPath);
  },
  filename(req: Request, file: Express.Multer.File, done: (error: Error | null, filename: string) => void) {
    done(null, generateFilename(file.originalname));
  }
});

const options: Options = {
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter(req: Request, file: Express.Multer.File, done: FileFilterCallback): void {
    if (file.mimetype.match(/jpeg|jpg|png|gif/)) {
      done(null, true);
    } else {
      done(new AppError('Unsupported file type.', StatusCodes.BAD_REQUEST));
    }
  }
};

const fileUpload = multer(options);

export default fileUpload;
