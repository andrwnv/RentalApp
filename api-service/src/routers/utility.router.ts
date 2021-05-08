import express from 'express';

import Connection from '../models/db_models';

const utilityRouter = express.Router();

utilityRouter.get('/database/connection_status', (req: express.Request, res: express.Response) => {
    Connection.authenticate().then(() => {
        const message = 'Connection has been established successfully.';
        console.log(message);

        res.status(200).json(message);
    }).catch(err => {
        const message = 'Unable to connect to the database!';
        console.error(message, err);

        res.status(500).json(message);
    });
});

utilityRouter.get('/database/init_db', (req: express.Request, res: express.Response) => {
    Connection.sync().then();
    res.status(200).json('DB Model sync!');
});

export default utilityRouter;
