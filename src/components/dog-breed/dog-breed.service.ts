import { dalDogBreed } from 'src/db/dal';
import { DogBreedAttributes, DogBreedAttributesInput } from 'src/db/models/DogBreed';
import { GetAllDogBreedsQueryParams, GetAllResponse } from './dog-breed.model';

export default {
  getAll: async (params: GetAllDogBreedsQueryParams): Promise<GetAllResponse> => {
    let page = undefined;
    let limit = undefined;

    if (params?.page) {
      page = +params.page
    }

    if (params?.limit) {
      limit = +params.limit
    }

    const { count, rows } = await dalDogBreed.getAll(page, limit);

    return {
      count,
      rows,
    };
  },
  get: async (id: number): Promise<DogBreedAttributes> => {
    const result = await dalDogBreed.getById(id);

    return result;
  },
  insert: async (payload: DogBreedAttributesInput): Promise<DogBreedAttributes> => {
    const result = await dalDogBreed.create(payload);

    return result;
  },
  update: async (id: number, paylad: Partial<DogBreedAttributesInput>): Promise<DogBreedAttributes> => {
    const result = await dalDogBreed.update(id, paylad);

    return result;
  },
  delete: async (id: number): Promise<void> => {
    await dalDogBreed.deleteById(id);
  }
};
