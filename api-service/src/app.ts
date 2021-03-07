import routes from './routes';

const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const express = require('express');
const http = require('http');

// Init express.
const server = express();
const port: Number = 3080;

server.use(bodyParser.json());

server.use(bodyParser.urlencoded({
    extended: true,
}));

server.use(express.json());
server.use(routes);

// Init socket.io and http server.
const app = http.Server(server);
const socketApp = socketIO(app);

const users: any = {};

socketApp.on('connection', (socket: any) => {
    const {user_id} = socket.handshake.query;
    users[user_id] = socket.id;
});

// server.use((req: any, res: any, next: any) => {
//     req.socketApp = socketApp;
//     req.users = users;
//
//     return next;
// })


app.listen(port, () => {
    console.log(`Server listening on the port: ${port}`);
});
