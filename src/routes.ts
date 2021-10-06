import { Application } from 'express';
import * as UserController from './controllers/users.controller';
import * as SeedersController from './controllers/seeders.controller';
import * as SignUpVerificationController from './controllers/signup.verification.controller';

import { validateRequest } from './helpers';
import registerSchema from './schema/register.schema';

export default function(app: Application) {
  /****
   * login route
   */
  app.get('/api/login', UserController.login);

  /****
   * register route
   */
  app.post(
    '/api/register',
    validateRequest(registerSchema),
    UserController.register,
  );

  app.post(
    '/api/verify/email/:token',
    SignUpVerificationController.verifyEmail,
  );

  app.get('/run-seeders', SeedersController.run);

  return;
}
