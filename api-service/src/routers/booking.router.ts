import express from 'express';

import { BookingCtrl } from '../api/booking_controller';

const bookingRouter = express.Router();

bookingRouter.patch('/confirm', BookingCtrl.confirm);
bookingRouter.delete('/', BookingCtrl.delete);
bookingRouter.post('/', BookingCtrl.create);
bookingRouter.get('/:id', BookingCtrl.index);

export default bookingRouter;
