import { Application } from 'express';
import * as UserController from './controllers/users.controller';
import * as SeedersController from './controllers/seeders.controller';
import * as SignUpVerificationController from './controllers/signup.verification.controller';

import { validateRequest } from './helpers';
import registerSchema from './schema/register.schema';
import AuthMiddleware from './middlewares/auth.middleware';
import AccountDetailsController from './controllers/account.details.controller';
import accountDetailsSchema from './schema/account.details.schema';
import UploadsController from './controllers/uploads.controller';
import UploadsRequestSchema from './schema/uploads.request.schema';
import attachfilesMiddleware from './middlewares/attachfiles.middleware';
import AddressController from './controllers/address.controller';
import UpdateAddressRequestSchema from './schema/update.address.req.schema';
import GetAddressRequestSchema from './schema/get.address.request.schema';
import CountryController from './controllers/country.controller';
import StateController from './controllers/state.controller';
import GetStateRequestSchema from './schema/get.state.request.schema';
import CollectionController from './controllers/collection.controller';

export default function(app: Application) {
  /****
   * login route
   */
  app.post('/api/login', UserController.login);

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

  app.get('/api/account-details', AuthMiddleware, AccountDetailsController.get);

  app.post(
    '/api/account-details',
    AuthMiddleware,
    validateRequest(accountDetailsSchema),
    AccountDetailsController.update,
  );

  app.post(
    '/api/upload',
    AuthMiddleware,
    validateRequest(UploadsRequestSchema),
    attachfilesMiddleware,
    UploadsController.upload,
  );

  app.post(
    '/api/address',
    AuthMiddleware,
    validateRequest(UpdateAddressRequestSchema),
    AddressController.update,
  );

  app.get(
    '/api/address',
    AuthMiddleware,
    validateRequest(GetAddressRequestSchema),
    AddressController.get,
  );

  app.get('/api/country', AuthMiddleware, CountryController.index);

  app.get(
    '/api/state/:country_code',
    AuthMiddleware,
    validateRequest(GetStateRequestSchema),
    StateController.index,
  );

  app.get(
    '/api/collection',
    AuthMiddleware,
    CollectionController.index,
  );  

  app.get('/run-seeders', SeedersController.run);

  return;
}
