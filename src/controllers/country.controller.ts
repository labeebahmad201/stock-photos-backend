import { Request, Response } from 'express';
import { sendResp } from './../helpers';
import CountryService from './../services/country.service';

async function index(req: Request, res: Response) {
  const service = new CountryService();

  const [status, message, resp] = await service.getCountries();
  return sendResp<any>(res, { ...resp }, 200, status, message);
}

export default { index };
