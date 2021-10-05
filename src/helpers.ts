import { Response } from 'express';

function sendResp<T>(res: Response, data: T) {
  const resp = JSON.stringify(data);
  return res.status(200).send(resp);
}

export { sendResp };
