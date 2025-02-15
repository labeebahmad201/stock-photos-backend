import mongoose from 'mongoose';
import env from './../config/dotenv';

mongoose.set('debug', env.ENV === 'dev' ? true : false);

export default async function(cb?: Function) {
  const DB_USER = env.DB_USER;
  const DB_PASSWORD = env.DB_PASSWORD;
  const DB_NAME = env.DB_NAME;

  const connectionString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.wqnzi.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(connectionString);
    console.log('Connected to database');

    if (cb !== undefined) {
      cb();
    }
  } catch (e) {
    console.log('DB connection failed', e);
  }
}
