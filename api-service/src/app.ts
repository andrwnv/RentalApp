import routes from './routes';
import dotenv from 'dotenv';
import passport from 'passport';

import AdminBro from 'admin-bro';
import AdminBroExpress from '@admin-bro/express';
import AdminBroSequelize from '@admin-bro/sequelize';

import Connection from './models/db_models';

const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');

dotenv.config();

// Init express.
const server = express();
const port = process.env.PORT || 3080;

AdminBro.registerAdapter(AdminBroSequelize);

const adminBro = new AdminBro({
    databases: [Connection],
    rootPath: '/admin',
    branding: {
        logo: 'https://res.cloudinary.com/rentalappclone/image/upload/c_scale,w_100/v1620461545/logomain.png',
        companyName: 'Rental App'
    }
})

const ADMIN_USER = {
    eMail: process.env.ADMIN_EMAIL || 'username',
    password: process.env.ADMIN_PASS || 'username'
}

server.use(adminBro.options.rootPath, AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    cookieName: process.env.ADMIN_EMAIL || 'admin@rental_app.gg',
    cookiePassword: process.env.ADMIN_PASS || 'username',
    authenticate: async (username, password) => {
        if (username === ADMIN_USER.eMail && password === ADMIN_USER.password) {
            return ADMIN_USER;
        }

        return null;
    }
}));


server.use(bodyParser.urlencoded({
    extended: true,
}));

server.use(passport.initialize());

server.use(bodyParser.json());
server.use(express.json());
server.use(routes);

// Init http server.
const app = http.Server(server);

app.listen(port, () => {
    console.log(`Server listening on the port: ${port}`);
});
