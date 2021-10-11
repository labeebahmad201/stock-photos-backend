import dotenv, { DotenvConfigOutput } from 'dotenv';

const config: DotenvConfigOutput = dotenv.config({
  path: __dirname + '/../.env',
});

process.env.ENV = process.env.ENV || 'dev';
const env = process.env;
export default env;
