import express from 'express';

import passport from '../services/passport';
import { BookingCtrl } from '../api/booking_controller';

const bookingRouter = express.Router();

bookingRouter.patch('/confirm', passport.authenticate('jwt', { session: false }), BookingCtrl.confirm);
bookingRouter.get('/', passport.authenticate('jwt', { session: false }), BookingCtrl.userReservations);
bookingRouter.delete('/', passport.authenticate('jwt', { session: false }), BookingCtrl.delete);
bookingRouter.post('/', passport.authenticate('jwt', { session: false }), BookingCtrl.create);
bookingRouter.get('/:id', passport.authenticate('jwt', { session: false }), BookingCtrl.index);

export default bookingRouter;
