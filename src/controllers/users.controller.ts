import { Request, Response } from 'express';
import { sendResp } from './../helpers';
import UserService from './../services/users.service';


function login(req: Request, res: Response) {
  const userService = new UserService();
  userService.login(req.body)
  .then(resp => {
    return sendResp<any>(res, { ...resp }, 200);
  })
  .catch(err => {
    return sendResp<any>(res, { status: err }, 422);
  });

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
