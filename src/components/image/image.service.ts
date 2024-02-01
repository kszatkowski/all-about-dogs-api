import query from '@services/db';
import { AppError } from '@utils';
import { StatusCodes } from 'http-status-codes';
import { OkPacketParams } from 'mysql2';

const tableName = '`images`';

export default {
  upload: async (filename: string): Promise<number> => {
    const result = await query<OkPacketParams>(`INSERT INTO ${tableName} (filename, dogBreedId) VALUES (?, ?)`, [filename, null]);

    if (result.insertId) {
      return result.insertId;
    }

    throw new AppError('Can not return insertId.', StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
