/* eslint-disable @typescript-eslint/camelcase */
import UserModel, { UserDocument } from '../models/user.model';
import bcrypt from 'bcrypt';
import appConfig from './../config/app';
import Role from './../models/role.model';
import EmailToken, {EmailTokenDocument} from "./../models/emailtoken.model";
import uniqid from "uniqid";

export default class UsersService {
  register(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const emailExistsPromise = UserModel.find({ email: data.email });
        const usernameExistsPromise = UserModel.find({
          username: data.username,
        });
        const phoneExistsPromise = UserModel.find({ phone: data.phone });

        Promise.all([
          emailExistsPromise,
          usernameExistsPromise,
          phoneExistsPromise,
        ]).then(async resp => {
          if (
            resp[0].length === 0 &&
            resp[1].length === 0 &&
            resp[2].length === 0
          ) {
            const user: UserDocument = new UserModel();
            user.firstname = data.firstname;
            user.lastname = data.lastname;
            user.phone = data.phone;
            user.email = data.email;
            user.is_verified = false;

            const roles = await this.getRole(data.role);
            const role = roles.shift();

            if (!role) {
              throw new Error('Role is undefiend');
            }

            user.role = role._id;
            const hashedPassword = await bcrypt.hash(
              data.password,
              appConfig.saltRounds,
            );
            user.password = hashedPassword;
            user.username = data.username;
            const newUser = await user.save();
            const emailToken: EmailTokenDocument = new EmailToken;
            emailToken.token = uniqid();
            emailToken.user = newUser._id;
            await emailToken.save();

            resolve(newUser);
          } else {
            let msg;
            if (resp[0].length > 0) {
              msg = 'Email already exists';
            } else if (resp[1].length > 0) {
              msg = 'Username already exists';
            } else if (resp[2].length > 0) {
              msg = 'Phone already exists';
            }

            reject({
              message: msg,
              validationErr: true,
            });
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  getRole(roleName: 'Seller' | 'Buyer') {
    return Role.find({ name: roleName });
  }
}
