import express from 'express';

import Connection from '../models/db_models';
import { body, validationResult } from 'express-validator';


class RentingAdsController {
    async index(_: express.Request, res: express.Response) {
        try {
            const rentedObjects = await Connection.models.object.findAll();

            res.status(200).json({
                status: 'Success',
                data: rentedObjects
            });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async newAds(_: express.Request, __: express.Response) {

    }

    async delete(_: express.Request, __: express.Response) {

    }

    async update(_: express.Request, __: express.Response) {

    }

    async userAds(_: express.Request, __: express.Response) {

    }
}

export const RentingAdsCtrl = new RentingAdsController();
