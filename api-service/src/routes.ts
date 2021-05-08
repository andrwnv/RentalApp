import express from 'express';

import classifiersRouter from './routers/classifiers.router';
import clientsRouter from './routers/client.router';
import rentAdsRouter from './routers/rent_ads.router';
import utilityRouter from './routers/utility.router';

const routes = express.Router();

routes.get('/', (_, res: express.Response) => {
    res.status(200).json('Hello world!');
})

routes.use('/utils', utilityRouter);
routes.use('/client', clientsRouter);
routes.use('/classifiers', classifiersRouter);
routes.use('/rent_ads', rentAdsRouter);

export default routes;
