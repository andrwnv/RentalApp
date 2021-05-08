import express from 'express';

import { ClassifiersCtrl } from '../api/classifiers_controller';


const classifiersRouter = express.Router();

classifiersRouter.get('/countries', ClassifiersCtrl.allCountries);
classifiersRouter.get('/streets', ClassifiersCtrl.allStreets);
classifiersRouter.get('/localities', ClassifiersCtrl.allLocalities);
classifiersRouter.get('/localities_types', ClassifiersCtrl.allLocalitiesTypes);
classifiersRouter.get('/house_types', ClassifiersCtrl.allHouseTypes);

export default classifiersRouter;
