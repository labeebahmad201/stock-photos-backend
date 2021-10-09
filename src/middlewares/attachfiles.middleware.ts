import { Request, Response, NextFunction } from 'express';
import formidable from 'formidable';

export default async (req: Request, res: Response, next: NextFunction) => {
  await new Promise((resolve, reject) => {
    const form = formidable();
    form.parse(req, (err, fields, files) => {
      req.files = files;
      resolve(true);
    });
  });
  next();
};
