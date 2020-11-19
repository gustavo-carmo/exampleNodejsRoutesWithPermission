import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

import authConfig from '@config/auth';

interface ITokenPayload {
  userRoles: string[];
}

export default function hasRoles(roles: string[]) {

  const validateUserAuthorization = (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = verify(token, authConfig.jwt.secret);

      const { userRoles } = decoded as ITokenPayload;

      const existsRoles = userRoles.some(role => roles.includes(role));

      if (!existsRoles) {
        throw new AppError("I'm sorry. But you don't have the permission!", 403);
      }

      next();
    } catch {
      throw new AppError("I'm sorry. But you don't have the permission!", 403);
    }
  }

  return validateUserAuthorization;
}
