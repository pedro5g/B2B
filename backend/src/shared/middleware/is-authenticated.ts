import { NextFunction, Request, Response } from 'express';
import { UnauthorizedException } from '../exceptions';

export const isAuthenticated = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (!req.user || !req.user.id) {
    throw new UnauthorizedException('Unauthorized. Please login');
  }

  next();
};
