import express from 'express';

import Connection from './models/db_models';
import { UserCtrl } from './api/user_controller';
import { RegisterValidate } from './validators/register_validator';

const routes = express.Router();

routes.get('/database/connection_status', (req: express.Request, res: express.Response) => {
    Connection.authenticate().then(() => {
        console.log('Connection has been established successfully.');
        res.status(200).json('ok');
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
        res.status(500).json('upsss/');
    });
});

routes.get('/init_db', (req: express.Request, res: express.Response) => {
    Connection.sync().then();
    res.status(200).json('Create');
});

routes.post('/clientTypes/create', (req: express.Request, res: express.Response) => {
    Connection.models.clientType.create({
        typeName: req.query.name
    }).then((clientType) => {
        res.status(200).json({
                status: 'Confirmed!',
                description: 'Client type added',
                result: clientType.toJSON(),
        });
    });
});

// User routes.
routes.get('/client/all', UserCtrl.index);
routes.get('/client/:id', UserCtrl.show);
routes.post('/client/signup', RegisterValidate, UserCtrl.create);
routes.get('/client/signup/verify', UserCtrl.verify);
routes.delete('/client/delete', UserCtrl.delete);

// routes.patch('/client', UserCtrl.update);

export default routes;
