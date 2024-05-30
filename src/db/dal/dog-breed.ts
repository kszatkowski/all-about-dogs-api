import { AppError } from '@utils';
import DogBreed, { DogBreedAttributes, DogBreedAttributesInput } from '../models/DogBreed';
import { StatusCodes } from 'http-status-codes';

export const create = async (payload: DogBreedAttributesInput): Promise<DogBreedAttributes> => {
  const dogBreed = await DogBreed.create(payload);

  return dogBreed;
};

export const update = async (id: number, payload: Partial<DogBreedAttributes>): Promise<DogBreed> => {
  const dogBreed = await DogBreed.findByPk(id);

  if (!dogBreed) {
    throw new AppError('Dog breed not found.', StatusCodes.NOT_FOUND);
  }

  const updatedDogBreed = await dogBreed.update(payload);

  return updatedDogBreed;
};

export const getById = async (id: number): Promise<DogBreedAttributes> => {
  const dogBreed = await DogBreed.findByPk(id);

  if (!dogBreed) {
    throw new AppError('Dog breed not found.', StatusCodes.NOT_FOUND);
  }

  return dogBreed;
};

export const deleteById = async (id: number): Promise<void> => {
  const deletedDogBreedCount = await DogBreed.destroy({
    where: { id }
  });

  if (!deletedDogBreedCount) {
    throw new AppError('Dog breed not found.', StatusCodes.NOT_FOUND);
  }
};

export const getAll = async (
  page: number = 1,
  limit: number = 10
): Promise<{
  count: number;
  rows: DogBreedAttributes[];
}> => {
  const { count, rows } = await DogBreed.findAndCountAll({
    offset: (page - 1) * limit,
    limit
  });

  return {
    count,
    rows
  };
};
