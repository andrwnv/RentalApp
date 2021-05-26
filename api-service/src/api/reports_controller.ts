import express from 'express';

import Connection from '../models/db_models';

class ReportsController {
    async create(req: express.Request, res: express.Response) {
        try {
            res.status(200).json({
                status: 'Success',
                data: ''
            });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async reasons(req: express.Request, res: express.Response) {
        try {
            res.status(200).json({
                status: 'Success',
                data: ''
            });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }
}

export const ReportsCtrl = new ReportsController();
