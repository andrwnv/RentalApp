import express from 'express';

import Connection from '../models/db_models';

class BookingController {
    async index(req: express.Request, res: express.Response) {
        try {

        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async create(req: express.Request, res: express.Response) {
        try {

        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async delete(req: express.Request, res: express.Response) {
        try {

        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async confirm(req: express.Request, res: express.Response) {
        try {

        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }
}

export const BookingCtrl = new BookingController();
