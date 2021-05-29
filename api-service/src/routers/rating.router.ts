import express from 'express';

import passport from '../services/passport';
import { RatingCtrl } from '../api/rating_controller';

const ratingRouter = express.Router();

ratingRouter.post('/', passport.authenticate('jwt', { session: false }), RatingCtrl.add);
ratingRouter.patch('/update_rate', passport.authenticate('jwt', { session: false }), RatingCtrl.update);
ratingRouter.get('/object_review', passport.authenticate('jwt', { session: false }), RatingCtrl.objectReview);
ratingRouter.get('/client_review', passport.authenticate('jwt', { session: false }), RatingCtrl.clientReview);


export default ratingRouter;
