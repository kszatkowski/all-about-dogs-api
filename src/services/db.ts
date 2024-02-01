import mysql from 'mysql2';
import { dbConfig } from '../config/database';

const query = async <T>(sql: string, params?: any[]) => {
  const pool = await mysql.createPool(dbConfig).promise();
  const [result] = await pool.query(sql, params);

  return result as T;
};

export default query;
