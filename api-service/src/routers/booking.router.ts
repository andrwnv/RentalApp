import express from 'express';

import passport from '../services/passport';
import { BookingCtrl } from '../api/booking_controller';
import { AdditionalComfortCtrl } from '../api/additional_comfort_controller';

const bookingRouter = express.Router();

bookingRouter.post('/additional_comfort', passport.authenticate('jwt', { session: false }), AdditionalComfortCtrl.create);
bookingRouter.get('/additional_comfort', passport.authenticate('jwt', { session: false }), AdditionalComfortCtrl.index);
bookingRouter.patch('/additional_comfort', passport.authenticate('jwt', { session: false }), AdditionalComfortCtrl.addRentID);
bookingRouter.patch('/confirm', passport.authenticate('jwt', { session: false }), BookingCtrl.confirm);
bookingRouter.get('/', passport.authenticate('jwt', { session: false }), BookingCtrl.userReservations);
bookingRouter.delete('/', passport.authenticate('jwt', { session: false }), BookingCtrl.delete);
bookingRouter.post('/', passport.authenticate('jwt', { session: false }), BookingCtrl.create);
bookingRouter.get('/:id', passport.authenticate('jwt', { session: false }), BookingCtrl.index);

export default bookingRouter;
