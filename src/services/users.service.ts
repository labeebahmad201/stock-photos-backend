import UserModel from '../models/user.model';
import bcrypt from 'bcrypt';
import appConfig from './../config/app';

export default class UsersService {
  register(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const emailExistsPromise = UserModel.find({ email: data.email });
        const usernameExistsPromise = UserModel.find({ username: data.username });
        const phoneExistsPromise = UserModel.find({ phone: data.phone });

        await Promise.all([
          emailExistsPromise,
          usernameExistsPromise,
          phoneExistsPromise,
        ]).then(async resp => {
          if (
            resp[0].length === 0 &&
            resp[1].length === 0 &&
            resp[2].length === 0
          ) {
            const user = new UserModel();
            user.firstname = data.firstname;
            user.lastname = data.lastname;
            user.phone = data.phone;
            user.email = data.email;
            const hashedPassword = await bcrypt.hash(
              data.password,
              appConfig.saltRounds,
            );
            user.password = hashedPassword;
            user.username = data.username;
            const newUser = await user.save();
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
}
