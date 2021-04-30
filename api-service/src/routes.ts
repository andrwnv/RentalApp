import express from 'express';
import multer from 'multer';

// import Connection from './models/db_models';
import { UserCtrl } from './api/user_controller';
import { RegisterValidate } from './validators/register_validator';
import passport from './services/passport';
import { UploadFileCtrl } from './api/upload_files_controller';

const routes = express.Router();

// routes.get('/database/connection_status', (req: express.Request, res: express.Response) => {
//     Connection.authenticate().then(() => {
//         console.log('Connection has been established successfully.');
//         res.status(200).json('ok');
//     }).catch(err => {
//         console.error('Unable to connect to the database:', err);
//         res.status(500).json('upsss/');
//     });
// });
//
// routes.get('/init_db', (req: express.Request, res: express.Response) => {
//     Connection.sync().then();
//     res.status(200).json('Create');
// });
//
// routes.post('/clientTypes/create', (req: express.Request, res: express.Response) => {
//     Connection.models.clientType.create({
//         typeName: req.query.name
//     }).then((clientType) => {
//         res.status(200).json({
//                 status: 'Confirmed!',
//                 description: 'Client type added',
//                 result: clientType.toJSON(),
//         });
//     });
// });


// User routes.

routes.get('/', (_, res: express.Response) => {
    res.status(200).json('Hello world!');
})

routes.get('/client/all', UserCtrl.index);
routes.post('/client/login',
    passport.authenticate('local'),
    UserCtrl.loginConfirmed);

routes.get('/client/signup/verify', UserCtrl.verify);
routes.post('/client/signup', RegisterValidate, UserCtrl.create);
routes.delete('/client/delete', UserCtrl.delete);
routes.get('/client/current_user', passport.authenticate('jwt', { session: false }), UserCtrl.getCurrentUserInfo);
routes.get('/client/:id', UserCtrl.show);


// Upload routes.
const store = multer.memoryStorage();
const upload = multer({
    dest: 'uploads/',
    storage: store
});

routes.post('/client/upload', upload.single('avatar'), passport.authenticate('jwt', { session: false }), UploadFileCtrl.uploadImage);

export default routes;
