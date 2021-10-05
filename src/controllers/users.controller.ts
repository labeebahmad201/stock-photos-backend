import { Request, Response } from 'express';
import { sendResp } from './../helpers';

interface LoginResp {
  id: number;
  name: string;
}

function login(req: Request, res: Response) {
  const response: LoginResp = { id: 1, name: 'labeeb1' };
  return sendResp<LoginResp>(res, response);
}

export { login };
