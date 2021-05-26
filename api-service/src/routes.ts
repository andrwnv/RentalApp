import express from 'express';

import classifiersRouter from './routers/classifiers.router';
import clientsRouter from './routers/client.router';
import rentAdsRouter from './routers/rent_ads.router';
import utilityRouter from './routers/utility.router';
import bookingRouter from './routers/booking.router';
import rentRouter from './routers/rent.router';
import reportsRouter from './routers/reports.controller';
import ratingRouter from './routers/rating.router';

const routes = express.Router();

routes.get('/', (_, res: express.Response) => {
    res.status(200).json('Hello world!');
})

routes.use('/utils', utilityRouter);
routes.use('/client', clientsRouter);
routes.use('/classifiers', classifiersRouter);
routes.use('/rent_ads', rentAdsRouter);
routes.use('/booking', bookingRouter);
routes.use('/report', reportsRouter);
routes.use('/rating', ratingRouter);
routes.use('/rent', rentRouter);

export default routes;
