import express from 'express';

import passport from '../services/passport';
import { RatingCtrl } from '../api/rating_controller';

const ratingRouter = express.Router();

ratingRouter.post('/', passport.authenticate('jwt', { session: false }), RatingCtrl.add);
ratingRouter.patch('/update_rate_rent', passport.authenticate('jwt', { session: false }), RatingCtrl.updateRent);
ratingRouter.patch('/update_rate_rent_hist', passport.authenticate('jwt', { session: false }), RatingCtrl.updateRentHist);
ratingRouter.patch('/update_rate_book_hist', passport.authenticate('jwt', { session: false }), RatingCtrl.updateBookHist);
ratingRouter.get('/object_review', passport.authenticate('jwt', { session: false }), RatingCtrl.objectReview);
ratingRouter.get('/client_review', passport.authenticate('jwt', { session: false }), RatingCtrl.clientReview);


export default ratingRouter;
