import express, { Application } from 'express';
import env from './config/dotenv';
import routes from './routes';
import database from './db/index';

const app: Application = express();

app.use(express.json());

const PORT = env.PORT;

app.use('/images', express.static(__dirname + '/uploads'));

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
  routes(app);
  database();
});
