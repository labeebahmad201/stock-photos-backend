import { Request, Response } from 'express';
import { sendResp } from './../helpers';
import UserService from './../services/users.service';


async function verifyEmail(req: Request, res: Response) {
  const userService = new UserService();

  userService
  .verifyEmail(req.params)
  .then(resp => {
    return sendResp<any>(res, {status: resp}, 200);
  })
  .catch(err => {
    return sendResp<any>(res, {status: err}, 422);
  });
}

export { verifyEmail };
