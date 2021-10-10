import { Request, Response } from 'express';
import { sendResp } from './../helpers';
import UserService from './../services/users.service';

async function update(req: Request, res: Response) {
  const userService = new UserService();

  try {
    const [status, message, resp] = await userService.updateAccountDetails(
      req,
      req.body,
    );
    return sendResp<any>(res, { ...resp }, 200, status, message);
  } catch (e) {
    return sendResp<any>(res, { user: e.message }, 200, false);
  }
}

async function get(req: Request, res: Response) {
  const userService = new UserService();

  const [status, message, payload] = await userService.getAccountDetails(
    req.user._id,
  );
  return sendResp<any>(res, payload, 200, status, message);
}

export default { update, get };
