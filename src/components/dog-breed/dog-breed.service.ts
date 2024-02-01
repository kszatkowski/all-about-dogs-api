import query from '@services/db';
import { DogBreed } from './dog-breed.model';
import { OkPacketParams } from 'mysql2';
import { AppError } from '@utils';
import { StatusCodes } from 'http-status-codes';

const tableName = '`dog-breeds`';

export default {
  getAll: async (): Promise<DogBreed[]> => {
    const result = await query<DogBreed[]>(`SELECT * FROM ${tableName} LIMIT 0, 1000`);

    return result;
  },
  get: async (id: number): Promise<DogBreed> => {
    const result = await query<DogBreed[]>(`SELECT * FROM ${tableName} WHERE id=?`, [id]);

    if (!result.length) {
      throw new AppError('Dog breed with passed id not found.', StatusCodes.NOT_FOUND);
    }

    return result[0];
  },
  insert: async (dogBreed: DogBreed): Promise<number> => {
    const { name, description, origin, size, lifespan, adaptability, trainability } = dogBreed;
    const result = await query<OkPacketParams>(
      `INSERT INTO ${tableName}
      (name, description, origin, size, lifespan, adaptability, trainability)
      VALUES
      (?, ?, ?, ?, ?, ?, ?)`,
      [name, description, origin, size, lifespan, adaptability, trainability]
    );

    if (result.insertId) {
      return result.insertId;
    }

    throw new AppError('Can not return insertId.', StatusCodes.INTERNAL_SERVER_ERROR);
  },
  update: async (id: number, dogBreed: Partial<DogBreed>): Promise<void> => {
    const { name, description, origin, size, lifespan, adaptability, trainability } = dogBreed;
    const result = await query<OkPacketParams>(
      `UPDATE ${tableName} SET
      name=?,
      description=?,
      origin=?,
      size=?,
      lifespan=?,
      adaptability=?,
      trainability=?
      WHERE id=?
      `,
      [name, description, origin, size, lifespan, adaptability, trainability, id]
    );

    if (result.affectedRows === 0) {
      throw new AppError('None dog breed affected.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  delete: async (id: number): Promise<void> => {
    const result = await query<OkPacketParams>(`DELETE FROM ${tableName} where id=?`, [id]);

    if (result.affectedRows === 0) {
      throw new AppError('None dog breed affected.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
};
