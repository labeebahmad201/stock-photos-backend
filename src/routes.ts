import { Application } from 'express';
import * as UserController from './controllers/users.controller';
import * as SeedersController from './controllers/seeders.controller';

import { validateRequest } from './helpers';
import registerSchema from './schema/register.schema';

export default function(app: Application) {
  /****
   * login route
   */
  app.get('/login', UserController.login);

  /****
   * register route
   */
  app.post('/register', validateRequest(registerSchema), UserController.register);

  app.get('/run-seeders', SeedersController.run);

  return;
}
