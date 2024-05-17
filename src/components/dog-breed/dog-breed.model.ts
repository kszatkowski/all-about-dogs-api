import { DogBreedAttributes } from "src/db/models/DogBreed";

export type DogBreed = DogBreedAttributes;

export type GetAllDogBreedsQueryParams = {
  page: string;
  limit: string;
};

export type GetAllResponse = {
  count: number;
  rows: DogBreed[];
}
