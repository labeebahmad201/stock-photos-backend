import { Request, Response } from 'express';
import { sendResp } from './../helpers';
import UserService from './../services/users.service';

async function login(req: Request, res: Response) {
  const userService = new UserService();
  try {
    const [status, message, resp] = await userService.login(req.body);
    return sendResp<any>(res, { ...resp }, 200, status, message);
  } catch ([status, message, resp]) {
    return sendResp<any>(res, { ...resp }, 200, status, message);
  }
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
