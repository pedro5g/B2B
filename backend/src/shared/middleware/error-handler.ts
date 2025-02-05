import { ErrorRequestHandler, Response } from 'express';
import { z, ZodError } from 'zod';
import { HTTP_STATUS } from '../utils/http-status';
import { AppError } from '../exceptions';
import { ErrorCode } from '../enums/error-code';

const formatZodError = (res: Response, error: z.ZodError) => {
  const errors = error?.issues?.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }));
  return res.status(HTTP_STATUS.BAD_REQUEST).json({
    message: 'Validation failed',
    errors: errors,
    errorCode: ErrorCode.VALIDATION_ERROR,
  });
};

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  _next,
): void => {
  console.error(`Error Occurred on PATH: ${req.path} `, error);

  if (error instanceof SyntaxError) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Invalid JSON format. Please check your request body.',
    });
  }

  if (error instanceof ZodError) {
    formatZodError(res, error);
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: 'Internal Server Error',
    error: error?.message || 'Unknown error occurred',
  });
};
