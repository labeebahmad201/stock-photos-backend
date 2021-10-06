import { Application } from 'express';
import * as UserController from './controllers/users.controller';
import { validateRequest } from './helpers';
import registerSchema from './schema/register.schema';

export default function(app: Application) {
  /****
   * login route
   */
  app.get('/login', UserController.login);

  app.post(
    '/register',
    validateRequest(registerSchema),
    UserController.register,
  );

  return;
}
