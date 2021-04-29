import express from 'express';

import Connection from './models/db_models';

const routes = express.Router();

routes.get('/database/connection_status', (req, res) => {
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

export default routes;
