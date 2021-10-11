import { Response, Request, NextFunction } from 'express';
import * as yup from 'yup';

function sendResp<T>(
  res: Response,
  data: T,
  statusCode = 200,
  status = true,
  message: false | string = false,
) {
  return res.status(statusCode).json({
    data: status === true ? data : null,
    errors: status === false ? data : null,
    status: status,
    message,
  });
}

const validateRequest = (schema: any) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await yup
      .object()
      .shape(schema)
      .validate({ ...req.body, ...req.params });
    next();
  } catch (e) {
    console.log(e);
    return sendResp<any>(res, { err: e.name, errors: e.errors });
  }
};

const getBearerToken = (req: Request) => {
  if (req.headers && req.headers.authorization) {
    const splittedBearerValue = req.headers.authorization.split(' ');
    if (splittedBearerValue.length == 2) {
      return splittedBearerValue[1]; // bearer token
    }
  }

  return false;
};

export { sendResp, validateRequest, getBearerToken };
