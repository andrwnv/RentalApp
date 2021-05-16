import express from 'express';
import multer from 'multer';

import passport from '../services/passport';

import { RegisterValidate } from '../validators/register_validator';
import { UploadFileCtrl } from '../api/upload_files_controller';
import { UserCtrl } from '../api/user_controller';
import { PlannedTripCtrl } from '../api/planned_trip_controller';


const store = multer.memoryStorage();
const upload = multer({
    dest: 'uploads/',
    storage: store
});

const clientsRouter = express.Router();

clientsRouter.get('/all', passport.authenticate('jwt', { session: false }), UserCtrl.index);
clientsRouter.post('/login',
    passport.authenticate('local'),
    UserCtrl.loginConfirmed);

clientsRouter.get('/create_lease', UploadFileCtrl.generatePDFLease);

clientsRouter.get('/signup/verify', UserCtrl.verify);
clientsRouter.post('/signup', RegisterValidate, UserCtrl.create);
clientsRouter.delete('/delete', UserCtrl.delete);
clientsRouter.get('/current_user', passport.authenticate('jwt', { session: false }), UserCtrl.getCurrentUserInfo);

clientsRouter.get('/:id', UserCtrl.show);
clientsRouter.post('/upload_avatar', upload.single('avatar'), passport.authenticate('jwt', { session: false }),
    UploadFileCtrl.uploadUserAvatar);

clientsRouter.get('/trip/all', passport.authenticate('jwt', { session: false }), PlannedTripCtrl.index);
clientsRouter.post('/trip/create', passport.authenticate('jwt', { session: false }), PlannedTripCtrl.create);
clientsRouter.delete('/trip/delete', passport.authenticate('jwt', { session: false }), PlannedTripCtrl.delete);

export default clientsRouter;
