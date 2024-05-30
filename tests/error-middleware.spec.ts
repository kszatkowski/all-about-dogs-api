import request from 'supertest';
import { createApp } from '@utils';
import { StatusCodes } from 'http-status-codes';
import dogBreedService from '../src/components/dog-breed/dog-breed.service';

const app = createApp();

describe('error middleware', () => {
  describe('when there is unhandled exception', () => {

    it('should return 500 status code', async () => {
      jest.spyOn(dogBreedService, 'getAll').mockImplementationOnce(() => {
        throw new Error('Something went wrong...');
      });
      const response = await request(app).get('/dog-breeds');

      expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });

    it('should return object with error details', async () => {
      jest.spyOn(dogBreedService, 'getAll').mockImplementationOnce(() => {
        throw new Error('Something went wrong...');
      });
      const response = await request(app).get('/dog-breeds');
      const body = response.body as Error;

      expect(body.message).toBe('Something went wrong...');
      expect(body.stack).toContain('Something went wrong...');
    });
  });
});
