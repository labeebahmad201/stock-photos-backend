import { Response, Request, NextFunction } from 'express';
import * as yup from 'yup';

function sendResp<T>(res: Response, data: T, status = 200) {
  return res.status(status).json({
    data: data,
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
      .validate(req.body);
    next();
  } catch (e) {
    return sendResp<any>(res, { err: e.name, errors: e.errors });
  }
};

export { sendResp, validateRequest };
