import express from 'express';

import passport from '../services/passport';
import { ReportsCtrl } from '../api/reports_controller';

const reportsRouter = express.Router();

reportsRouter.post('/', passport.authenticate('jwt', { session: false }), ReportsCtrl.create);
reportsRouter.get('/reasons', passport.authenticate('jwt', { session: false }), ReportsCtrl.reasons);

export default reportsRouter;
