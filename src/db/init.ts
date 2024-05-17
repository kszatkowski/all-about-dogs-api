import { DogBreed } from './models';

const dbInit = async () => {
  await DogBreed.sync({ alter: true });
};

export default dbInit;
