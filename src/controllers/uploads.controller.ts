import { Request, Response } from 'express';
import { sendResp } from './../helpers';
import UploadsService from './../services/uploads.service';

async function upload(req: Request, res: Response) {
  const uploadsService = new UploadsService();

  const [status, message, resp] = await uploadsService.upload(req.files.file);
  return sendResp<any>(res, { resp }, 200, status, message);
}

export default { upload };
