import request from 'supertest';
import query from '@services/db';
import { createApp } from '@utils';
import { StatusCodes } from 'http-status-codes';

const app = createApp();

jest.mock('../src/services/db');
const queryMock = jest.mocked(query);

describe('error middleware', () => {
  describe('when there is unhandled exception', () => {
    queryMock.mockImplementation(() => Promise.reject(new Error('Something went wrong...')));

    it('should return 500 status code', async () => {
      const response = await request(app).get('/dog-breeds');

      expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });

    it('should return object with error details', async () => {
      const response = await request(app).get('/dog-breeds');
      const body = response.body as Error;

      expect(body.message).toBe('Something went wrong...');
      expect(body.stack).toContain('Something went wrong...');
    });
  });
});
