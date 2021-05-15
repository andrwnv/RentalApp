import express from 'express';

import Connection from '../models/db_models';
import Client from '../models/types/client_type';

class PlannedTripController {
    async index(req: express.Request, res: express.Response) {
        try {
            const userTrips = await Connection.models.clientPlannedTrips.findAll({
                where: {
                    FK_client: (req.user as Client).id
                }
            });

            res.status(200).json({
                status: 'Success',
                data: [
                    ...userTrips
                ]
            });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async create(req: express.Request, res: express.Response) {
        try {
            const tripData = {
                comfortProps: req.body.comfortProps,
                priceFrom: Math.min(...req.body.price),
                priceTo: Math.max(...req.body.price),
                requireRatingFrom: Math.min(...req.body.rating),
                requireRatingTo: Math.max(...req.body.rating),
                beginDate: req.body.beginDate,
                FK_client: (req.user as Client).id
            };

            const trip = await Connection.models.clientPlannedTrips.create(tripData);

            res.status(200).json({
                status: 'Success',
                data: {
                    id: trip.get('id'),
                    tripData
                }
            });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async delete(req: express.Request, res: express.Response) {
        try {
            await Connection.models.clientPlannedTrips.destroy({
                where: {
                    id: req.body.id
                }
            });

            res.status(200).json({ status: 'Success' });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }
}

export const PlannedTripCtrl = new PlannedTripController();
