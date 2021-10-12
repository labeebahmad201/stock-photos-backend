import { Request, Response, NextFunction } from 'express';
import { getBearerToken, sendResp } from './../helpers';
import jwt from 'jsonwebtoken';
import dotenv from './../config/dotenv';

const isAccountVerified = (req: Request | any) => {
  if (req.user.is_verified) {
    return true;
  }
  return false;
};

export const socketAuthMiddleware = function(socket, next) {
  const authHeader = socket.handshake.headers.authorization;
  const token = getBearerToken(authHeader);

  if (!token) {
    console.log('Error: token not found', JSON.stringify(token));    
    socket.disconnect();      
  }

  if (!dotenv.JWT_SECRET_KEY) {
    console.log('Error: JWT_SECRET_KEY is undefined', JSON.stringify(dotenv));
    socket.disconnect();        
    throw new Error('JWT_SECRET_KEY is undefined');
  }


  jwt.verify(token, dotenv.JWT_SECRET_KEY, function(error, decoded) {
    
    if (error) {
      console.log('Error: jwt error', JSON.stringify(error));  
      socket.disconnect();
    }

    socket.user = decoded;
    socket.join(socket.user._id.toString());    
    const isVerified = isAccountVerified(socket);
    if (!isVerified) {
      console.log('Error:account not verified', JSON.stringify(socket.user));
      socket.disconnect();      
    }

    console.log('connected>>>');
    next();
  });
}

// default authMiddleware for REST endpoints.
export default function(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization || '';
  const token = getBearerToken(authHeader);
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
