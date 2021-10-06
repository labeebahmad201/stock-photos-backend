/* eslint-disable @typescript-eslint/camelcase */
import UserModel, { UserDocument } from '../models/user.model';
import bcrypt from 'bcrypt';
import appConfig from './../config/app';
import Role from './../models/role.model';
import User from './../models/user.model';
import EmailToken, { EmailTokenDocument } from './../models/emailtoken.model';
import uniqid from 'uniqid';
import EmailService from './email.service';
import dotenv from './../config/dotenv';
import _ from "lodash";

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
            const emailToken: EmailTokenDocument = new EmailToken();
            emailToken.token = uniqid();
            emailToken.user = newUser._id;
            await emailToken.save();

            const emailService = new EmailService();
            const msgBody = `Hi ${user.firstname} ${user.lastname}, Your Sign Up is almost complete, please click 
                                    <a href="${dotenv.FRONT_END_BASE_URL}/email/verifiy/${emailToken.token}">here</a> 
                                    to verify your email.
                                    `;
            emailService.sendMail(
              user.email.toString(),
              'SignUp Email',
              msgBody,
            );
            resolve(_.omit(newUser.toJSON(), ["password", "_id"]));
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

  async verifyEmail(data: any) {
    return new Promise((resolve, reject) => {
      EmailToken.findOne({ token: data.token })
        .populate('user')
        .then(emailToken => {
          if (!emailToken) {
            reject({
              status: false,
              message: 'Expired token',
            });
            return;
          }
          if (emailToken.user) {
            const _id = JSON.parse(JSON.stringify(emailToken.user))._id;
            User.findOneAndUpdate({ _id: _id }, { is_verified: true }).then(
              () => {
                EmailToken.deleteOne({ _id: emailToken._id })
                  .then(r => {
                    resolve({
                      status: true,
                      message: 'Email verified',
                    });
                  })
                  .catch(e => {
                    console.log(e);
                  });
              },
            );
          }
        })
        .catch(e => {
          reject({
            status: false,
            message: 'Expired token',
          });
        });
    });
  }
}
