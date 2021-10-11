import { Request, Response } from 'express';
import { sendResp } from './../helpers';
import CategoryService from './../services/category.service';

async function index(req: Request, res: Response) {
  const service = new CategoryService();

  const [status, message, resp] = await service.getCategories();
  return sendResp<any>(res, { ...resp }, 200, status, message);
}

export default { index };
