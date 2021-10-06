import { Request, Response } from 'express';
import { sendResp } from './../helpers';
import UserService from './../services/users.service';

interface LoginResp {
  id: number;
  name: string;
}

function login(req: Request, res: Response) {
  const response: LoginResp = { id: 1, name: 'labeeb1' };
  return sendResp<LoginResp>(res, response);
}

async function register(req: Request, res: Response) {
  const userService = new UserService();

  userService
    .register(req.body)
    .then(resp => {
      return sendResp<any>(res, { user: resp }, 200);
    })
    .catch(err => {
      return sendResp<any>(res, { user: err }, 422);
    });
}

export { login, register };
