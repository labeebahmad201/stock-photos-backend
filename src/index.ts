import express, { Application } from 'express';
import env from './config/dotenv';
import routes from './routes';
import database from './db/index';
import http from 'http';
import io from 'socket.io';
import bootstrapSocketController from './controllers/bootstrapSocket.controller';

const app: Application = express();

app.use(express.json());

const PORT = env.PORT;

app.use('/images', express.static(__dirname + '/uploads'));

app.get('/', (req, res)=>{
  const path = process.cwd() + '/src/view.html';
  res.sendFile(path);
});

app.get('/user2', (req, res)=>{
  const path = process.cwd() + '/src/user2.html';
  res.sendFile(path);
});

const server = http.Server(app);
const ioServer = io(server);

bootstrapSocketController(ioServer);

server.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
  routes(app);
  database();
});
