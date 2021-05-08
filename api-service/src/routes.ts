import express from 'express';

import classifiersRouter from './routers/classifiers.router';
import clientsRouter from './routers/client.router';
import rentAdsRouter from './routers/rent_ads.router';

const routes = express.Router();

// import Connection from './models/db_models';
// routes.get('/database/connection_status', (req: express.Request, res: express.Response) => {
//     Connection.authenticate().then(() => {
//         console.log('Connection has been established successfully.');
//         res.status(200).json('ok');
//     }).catch(err => {
//         console.error('Unable to connect to the database:', err);
//         res.status(500).json('upsss/');
//     });
// });
//
// routes.get('/init_db', (req: express.Request, res: express.Response) => {
//     Connection.sync().then();
//     res.status(200).json('Create');
// });
//
// routes.post('/clientTypes/create', (req: express.Request, res: express.Response) => {
//     Connection.models.clientType.create({
//         typeName: req.query.name
//     }).then((clientType) => {
//         res.status(200).json({
//                 status: 'Confirmed!',
//                 description: 'Client type added',
//                 result: clientType.toJSON(),
//         });
//     });
// });

routes.get('/', (_, res: express.Response) => {
    res.status(200).json('Hello world!');
})

routes.use('/client', clientsRouter);
routes.use('/classifiers', classifiersRouter);
routes.use('/rent_ads', rentAdsRouter);

export default routes;
