import { Request, Response, NextFunction } from 'express';
import { getBearerToken, sendResp } from './../helpers';
import jwt from 'jsonwebtoken';
import dotenv from './../config/dotenv';

const isAccountVerified = (req: Request) => {
  if (req.user.is_verified) {
    return true;
  }
  return false;
};

export default function(req: Request, res: Response, next: NextFunction) {
  const token = getBearerToken(req);
  if (!token) {
    return sendResp<any>(res, {
      err: 'AuthFailed',
      errors: ['Token Not Found'],
    });
  }

  if (!dotenv.JWT_SECRET_KEY) {
    throw new Error('JWT_SECRET_KEY is undefined');
  }

  jwt.verify(token, dotenv.JWT_SECRET_KEY, function(error, decoded) {
    if (error) {
      return sendResp<any>(res, { err: 'AuthFailed', errors: [error.message] });
    }

    req.user = decoded;
    const isVerified = isAccountVerified(req);
    if (!isVerified) {
      return sendResp<any>(res, {
        err: 'AuthFailed',
        errors: ['Please verifiy your account first'],
      });
    }

    next();
  });
}
