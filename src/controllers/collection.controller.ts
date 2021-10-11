import { Request, Response } from 'express';
import { sendResp } from './../helpers';
import CollectionService from './../services/collection.service';

async function index(req: Request, res: Response) {
  const service = new CollectionService();

  const [status, message, resp] = await service.getCollections();
  return sendResp<any>(res, { ...resp }, 200, status, message);
}

export default { index };
