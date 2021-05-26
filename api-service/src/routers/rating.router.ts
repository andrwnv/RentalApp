import express from 'express';

import passport from '../services/passport';
import { RatingCtrl } from '../api/rating_controller';

const ratingRouter = express.Router();

ratingRouter.post('/', passport.authenticate('jwt', { session: false }), RatingCtrl.add);

export default ratingRouter;
