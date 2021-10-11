import { Request, Response } from 'express';
import { sendResp } from './../helpers';
import StateService from './../services/state.service';

async function index(req: Request, res: Response) {
  const service = new StateService();

  const [status, message, resp] = await service.getStates(
    req.params.country_code,
  );
  return sendResp<any>(res, { ...resp }, 200, status, message);
}

export default { index };
