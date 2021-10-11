import { Request, Response } from 'express';
import { sendResp } from '../helpers';
import ContributionService from '../services/contribution.service';

async function create(req: Request, res: Response) {
  const service = new ContributionService();

  try {
    const [status, message, resp] = await service.contribute(req.body);
    console.log(status, message, resp);

    return sendResp<any>(res, { ...resp }, 200, status, message);
  } catch ([status, message, resp]) {
    return sendResp<any>(res, { ...resp }, 200, status, message);
  }
}

export default { create };
