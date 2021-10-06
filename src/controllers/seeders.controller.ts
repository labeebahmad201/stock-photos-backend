import { Request, Response } from 'express';
import { sendResp } from './../helpers';
import Seeders from './../seeders/index.seeder';

function run(req: Request, res: Response) {
  Seeders();
  return sendResp<any>(res, { status: true });
}

export { run };
