import { StatusCodes } from 'http-status-codes';

export class AppError extends Error {
  readonly httpStatusCode: StatusCodes;

  constructor(message: string, httpCode: StatusCodes) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.httpStatusCode = httpCode;
  }
}
