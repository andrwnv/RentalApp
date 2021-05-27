import express from 'express';

import passport from '../services/passport';
import { RentCtrl } from '../api/rent_controller';

const rentRouter = express.Router();

rentRouter.post('/move_to_history', passport.authenticate('jwt', { session: false }), RentCtrl.moveToHistory);
rentRouter.delete('/', passport.authenticate('jwt', { session: false }), RentCtrl.delete);
rentRouter.post('/', passport.authenticate('jwt', { session: false }), RentCtrl.moveFromBooking);
rentRouter.get('/now', passport.authenticate('jwt', { session: false }), RentCtrl.userRentNow);
rentRouter.get('/history', passport.authenticate('jwt', { session: false }), RentCtrl.userHistory);
rentRouter.get('/:id', passport.authenticate('jwt', { session: false }), RentCtrl.index);

export default rentRouter;
