import express from 'express';
import multer from 'multer';

import passport from '../services/passport';

import { NewRentAdValidate } from '../validators/new_rent_ad_validator';
import { UploadFileCtrl } from '../api/upload_files_controller';
import { RentingAdsCtrl } from '../api/renting_ads_controller';

const store = multer.memoryStorage();
const upload = multer({
    dest: 'uploads/',
    storage: store
});

const rentAdsRouter = express.Router();

rentAdsRouter.get('/all', passport.authenticate('jwt', { session: false }), RentingAdsCtrl.index);
rentAdsRouter.post('/', passport.authenticate('jwt', { session: false }), RentingAdsCtrl.newAd);
rentAdsRouter.delete('/', passport.authenticate('jwt', { session: false }), RentingAdsCtrl.delete);
rentAdsRouter.patch('/', passport.authenticate('jwt', { session: false }), RentingAdsCtrl.update);
rentAdsRouter.get('/user_ads', passport.authenticate('jwt', { session: false }), NewRentAdValidate, RentingAdsCtrl.userAds);
rentAdsRouter.post('/upload_photos', passport.authenticate('jwt', { session: false }),
    upload.array('adImages', 10), UploadFileCtrl.uploadAdPhotos);
rentAdsRouter.get('/:id',  passport.authenticate('jwt', { session: false }), RentingAdsCtrl.show);

export default rentAdsRouter;
