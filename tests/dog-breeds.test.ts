import request from 'supertest';
import { AppError, createApp } from '@utils';
import { DogBreed } from 'src/components/dog-breed/dog-breed.model';
import { StatusCodes } from 'http-status-codes';
import { ContentTypes } from '@utils/enums';
import query from '../src/services/db';
import { OkPacketParams } from 'mysql2';
import { FieldValidationError } from 'express-validator';

const app = createApp();

jest.mock('../src/services/db');

const queryMock = jest.mocked(query);
const baseUrl = '/dog-breeds';

const payload = {
  adaptability: 1,
  description: 'test description',
  lifespan: 'test lifespan',
  name: 'test name',
  origin: 'test origin',
  size: 'test size',
  trainability: 1
} as DogBreed;

const testValidation = (requestWithMethod: () => request.Test, payload: DogBreed) => {
  describe('when payload is passed', () => {
    describe('name:', () => {
      it('should be string', async () => {
        const response = await requestWithMethod().send({
          ...payload,
          name: 1
        });
        const errors = response.body.errors as Record<keyof DogBreed, FieldValidationError>;
        const error = errors.name.msg;

        expect(error).toBe('Name should be string.');
      });
      it('should not has length less than 3 characters', async () => {
        const response = await requestWithMethod().send({
          ...payload,
          name: 'a'.repeat(2)
        } as DogBreed);
        const errors = response.body.errors as Record<keyof DogBreed, FieldValidationError>;
        const error = errors.name.msg;

        expect(error).toBe('Name should be between 3 to 32 characters.');
      });
      it('should not has length more than 32 characters', async () => {
        const response = await requestWithMethod().send({
          ...payload,
          name: 'a'.repeat(33)
        } as DogBreed);
        const errors = response.body.errors as Record<keyof DogBreed, FieldValidationError>;
        const error = errors.name.msg;

        expect(error).toBe('Name should be between 3 to 32 characters.');
      });
    });

    describe('description:', () => {
      it('should not be empty', async () => {
        const response = await requestWithMethod().send({
          ...payload,
          description: ''
        } as DogBreed);
        const errors = response.body.errors as Record<keyof DogBreed, FieldValidationError>;
        const error = errors.description.msg;

        expect(error).toBe('Description should not be empty.');
      });
    });
    it('should not has length more than 10000 characters', async () => {
      const response = await requestWithMethod().send({
        ...payload,
        description: 'a'.repeat(10005)
      } as DogBreed);
      const errors = response.body.errors as Record<keyof DogBreed, FieldValidationError>;
      const error = errors.description.msg;

      expect(error).toBe('The length of description must be 10000 characters or fewer.');
    });
  });

  describe('adaptability:', () => {
    it('should not be empty', async () => {
      const response = await requestWithMethod().send({
        ...payload,
        adaptability: ''
      });
      const errors = response.body.errors as Record<keyof DogBreed, FieldValidationError>;
      const error = errors.adaptability.msg;

      expect(error).toBe('Adaptability should not be empty.');
    });
    it('should be integer not less than 1', async () => {
      const response = await requestWithMethod().send({
        ...payload,
        adaptability: 0
      });
      const errors = response.body.errors as Record<keyof DogBreed, FieldValidationError>;
      const error = errors.adaptability.msg;

      expect(error).toBe('Adaptability must be integer between 1 and 5.');
    });
    it('should be integer not more than 5', async () => {
      const response = await requestWithMethod().send({
        ...payload,
        adaptability: 6
      });
      const errors = response.body.errors as Record<keyof DogBreed, FieldValidationError>;
      const error = errors.adaptability.msg;

      expect(error).toBe('Adaptability must be integer between 1 and 5.');
    });
  });

  describe('trainability:', () => {
    it('should not be empty', async () => {
      const response = await requestWithMethod().send({
        ...payload,
        trainability: ''
      });
      const errors = response.body.errors as Record<keyof DogBreed, FieldValidationError>;
      const error = errors.trainability.msg;

      expect(error).toBe('Trainability should not be empty.');
    });
    it('should be integer not less than 1', async () => {
      const response = await requestWithMethod().send({
        ...payload,
        trainability: 0
      });
      const errors = response.body.errors as Record<keyof DogBreed, FieldValidationError>;
      const error = errors.trainability.msg;

      expect(error).toBe('Trainability must be integer between 1 and 5.');
    });
    it('should be integer not more than 5', async () => {
      const response = await requestWithMethod().send({
        ...payload,
        trainability: 6
      });
      const errors = response.body.errors as Record<keyof DogBreed, FieldValidationError>;
      const error = errors.trainability.msg;

      expect(error).toBe('Trainability must be integer between 1 and 5.');
    });
  });
};

describe('GET /dog-breeds', () => {
  beforeEach(() => {
    queryMock.mockImplementation(() => Promise.resolve([{} as DogBreed]));
  });
  it('should return proper content-type headers', async () => {
    const response = await request(app).get(baseUrl);

    expect(response.headers['content-type']).toBe(ContentTypes.applicationJson);
  });
  it('should return array of objects in body', async () => {
    const response = await request(app).get(baseUrl);

    expect(Array.isArray(response.body)).toBe(true);
  });
  it('should return 200 status code', async () => {
    const response = await request(app).get(baseUrl);

    expect(response.status).toBe(StatusCodes.OK);
  });
});

describe('GET /dog-breeds/:id', () => {
  const id = 1;

  beforeEach(() => {
    queryMock.mockImplementation(() => Promise.resolve([{} as DogBreed]));
  });

  it('should return proper content-type headers', async () => {
    const response = await request(app).get(`${baseUrl}/${id}`);

    expect(response.headers['content-type']).toBe(ContentTypes.applicationJson);
  });
  it('should return object in body', async () => {
    const response = await request(app).get(`${baseUrl}/${id}`);

    expect(Array.isArray(response.body)).toBe(false);
  });
  it('should return 200 status code', async () => {
    const response = await request(app).get(`${baseUrl}/${id}`);

    expect(response.status).toBe(StatusCodes.OK);
  });

  describe('when passed id is not found', () => {
    beforeEach(() => {
      queryMock.mockImplementation(() => Promise.resolve([]));
    });
    it('should return error with error message', async () => {
      const response = await request(app).get(`${baseUrl}/${id}`);
      const error = response.body.error as AppError;

      expect(error).toBe('Dog breed with passed id not found.');
    });

    it('should return 404 status code', async () => {
      const response = await request(app).get(`${baseUrl}/${id}`);

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });
});

describe('POST /dog-breeds', () => {
  beforeEach(() => {
    queryMock.mockImplementation(() => Promise.resolve({ insertId: 1 } as OkPacketParams));
  });

  it('should return proper content-type headers', async () => {
    const response = await request(app).post(baseUrl).send(payload);

    expect(response.headers['content-type']).toBe(ContentTypes.applicationJson);
  });
  it('should return id in body', async () => {
    const response = await request(app).post(baseUrl).send(payload);

    expect(response.body).toBe(1);
  });
  it('should return 201 status code', async () => {
    const response = await request(app).post(baseUrl).send(payload);

    expect(response.status).toBe(StatusCodes.CREATED);
  });

  describe('when insertId is not specified', () => {
    beforeEach(() => {
      queryMock.mockImplementation(() => Promise.resolve({} as OkPacketParams));
    });
    it('should return error with error message', async () => {
      const response = await request(app).post(baseUrl).send(payload);
      const error = response.body.error as AppError;

      expect(error).toBe('Can not return insertId.');
    });

    it('should return 500 status code', async () => {
      const response = await request(app).post(baseUrl).send(payload);

      expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });

  testValidation(() => request(app).post(baseUrl), payload);
});

describe('PUT /dog-breeds/:id', () => {
  const id = 1;

  beforeEach(() => {
    queryMock.mockImplementation(() => Promise.resolve({ affectedRows: 1 } as OkPacketParams));
  });

  it('should return 204 status code', async () => {
    const response = await request(app).put(`${baseUrl}/${id}`).send(payload);

    expect(response.status).toBe(StatusCodes.NO_CONTENT);
  });

  describe('when there was no affected rows', () => {
    beforeEach(() => {
      queryMock.mockImplementation(() => Promise.resolve({ affectedRows: 0 } as OkPacketParams));
    });
    it('should return error with error message', async () => {
      const response = await request(app).put(`${baseUrl}/${id}`).send(payload);
      const error = response.body.error as AppError;

      expect(error).toBe('None dog breed affected.');
    });

    it('should return 500 status code', async () => {
      const response = await request(app).put(`${baseUrl}/${id}`).send(payload);

      expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });

  testValidation(() => request(app).put(`${baseUrl}/${id}`), payload);
});

describe('DELETE /dog-breeds/:id', () => {
  const id = 1;

  beforeEach(() => {
    queryMock.mockImplementation(() => Promise.resolve([{ affectedRows: 1 } as OkPacketParams]));
  });

  it('should return proper content-type headers', async () => {
    const response = await request(app).delete(`${baseUrl}/${id}`);

    expect(response.headers['content-type']).toBe(ContentTypes.applicationJson);
  });
  it('should return 204 status code', async () => {
    const response = await request(app).delete(`${baseUrl}/${id}`);

    expect(response.status).toBe(StatusCodes.NO_CONTENT);
  });

  describe('when passed id is not found', () => {
    beforeEach(() => {
      queryMock.mockImplementation(() => Promise.resolve({ affectedRows: 0 } as OkPacketParams));
    });
    it('should return error with error message', async () => {
      const response = await request(app).delete(`${baseUrl}/${id}`);
      const error = response.body.error as AppError;

      expect(error).toBe('None dog breed affected.');
    });

    it('should return 500 status code', async () => {
      const response = await request(app).delete(`${baseUrl}/${id}`);

      expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });
});
