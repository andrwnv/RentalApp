import express from 'express';

import Connection from '../models/db_models';
import Client from '../models/types/client_type';

class RentController {
    async index(req: express.Request, res: express.Response) {
        try {
            const client = req.user as Client;

        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async moveFromBooking(req: express.Request, res: express.Response) {
        try {
            const landlord = req.user as Client;

        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async moveToHistory(req: express.Request, res: express.Response) {
        try {
            const landlord = req.user as Client;

        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async userHistory(req: express.Request, res: express.Response) {
        try {
            const landlord = req.user as Client;

        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }
}

export const RentCtrl = new RentController();
