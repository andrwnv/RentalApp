import express from 'express';

import Connection from '../models/db_models';

class AdditionalComfortController {
    async allAdditionalComfort(req: express.Request, res: express.Response) {

        try {
            if ( !req.body.land_id ) {
                res.status(400).json({
                    status: 'Error',
                    data: 'Bad request!'
                });

                return;
            }
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }
}

export const AdditionalComfortCtrl = new AdditionalComfortController();
