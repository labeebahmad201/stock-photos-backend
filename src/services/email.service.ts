/* eslint-disable @typescript-eslint/camelcase */
import sgMail from '@sendgrid/mail';
import dotenv from './../config/dotenv';

export default class EmailService {
  sendMail(to: string, subject: string, msgBody: string) {
    return new Promise((resolve, reject) => {
      if (!dotenv.SENDGRID_API_KEY) {
        reject({
          status: false,
          message: 'Sendgrid error',
        });
        return;
      }

      sgMail.setApiKey(dotenv.SENDGRID_API_KEY);
      const msg = {
        to: to,
        from: new String(dotenv.SENDGRID_FROM_EMAIL).toString(), // Use the email address or domain you verified above
        subject: subject,
        html: msgBody,
      };

      sgMail.send(msg).then(
        r => {
          resolve(true);
        },
        error => {
          console.error(error);
          reject(error);
          if (error.response) {
            console.error(error.response.body);
          }
        },
      );
    });
  }
}
