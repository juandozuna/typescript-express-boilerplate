import {StatusCodes} from "../config/StatusCodes";

export default class AppError {
  
  constructor(
    message: string,
    statusCode = StatusCodes.BAD_REQUEST,
  ) {
    this.message = message;
    this.statusCode = statusCode;
  }
  
  message: string;
  statusCode: StatusCodes;
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export class InvalidError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_ACCEPTABLE);
  }
}