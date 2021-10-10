import { Request, Response } from 'express';
import { sendResp } from './../helpers';
import AddressService from './../services/address.service';

async function update(req: Request, res: Response) {
  const addressService = new AddressService();

  const [status, message, resp] = await addressService.updateOrCreate(
    req,
    req.body,
  );
  return sendResp<any>(res, { resp }, 200, status, message);
}

async function get(req: Request, res: Response) {
  const addressService = new AddressService();

  const [status, message, address] = await addressService.getAddress(
    req,
    req.body.type,
  );
  return sendResp<any>(res, { address }, 200, status, message);
}

export default { update, get };
