import { AppError } from '@utils';
import { StatusCodes } from 'http-status-codes';
import Image, { ImageAttributes, ImageAttributesInput } from '../models/Image';

export const create = async (payload: ImageAttributesInput): Promise<ImageAttributes> => {
  const image = await Image.create(payload);

  return image;
};

export const update = async (id: number, payload: Partial<ImageAttributes>): Promise<Image> => {
  const image = await Image.findByPk(id);

  if (!image) {
    throw new AppError('Image not found.', StatusCodes.NOT_FOUND);
  }

  const updatedImage = await image.update(payload);

  return updatedImage;
};
