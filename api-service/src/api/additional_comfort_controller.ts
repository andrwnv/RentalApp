import express from 'express';

import Connection from '../models/db_models';

class AdditionalComfortController {
    async create(req: express.Request, res: express.Response) {
        try {
            if ( !req.body.bookingId ) {
                res.status(400).json({
                    status: 'Error',
                    data: 'Bad request!'
                });

                return;
            }

            const selectedComfort = await Connection.models.additionalComfort.create({
                nameOfComfort: req.body.name,
                description: req.body.description,
                price: req.body.price,
                FK_bookingObject: req.body.bookingId,
            });

            res.status(200).json({
                status: 'Success',
                data: selectedComfort
            });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async addRentID(req: express.Request, res: express.Response) {
        try {
            if ( !req.body.bookingId ) {
                res.status(400).json({
                    status: 'Error',
                    data: 'Bad request!'
                });

                return;
            }

            const selectedComfort = await Connection.models.additionalComfort.findAll({
                where: {
                    FK_bookingObject: req.body.bookingId,
                },
            });

            if (selectedComfort == null) {
                res.status(400).json({
                    status: 'Error',
                    data: 'Selected reservation not found!'
                });

                return;
            }

            for (const res1 of selectedComfort) {
                await res1.update({
                    FK_rentObject: req.body.rentId
                });
            }

            res.status(200).json({
                status: 'Success',
                data: selectedComfort
            });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async index(req: express.Request, res: express.Response) {
        try {
            if ( !req.body.bookingId && !req.body.rentId ) {
                res.status(400).json({
                    status: 'Error',
                    data: 'Bad request!'
                });

                return;
            }

            if (req.body.bookingId) {
                const selectedComfort = await Connection.models.additionalComfort.findAll({
                    where: {
                        FK_bookingObject: req.body.bookingId,
                    },
                });

                res.status(200).json({
                    status: 'Success',
                    data: selectedComfort
                });

                return;
            } else if (req.body.rentId) {
                const selectedComfort = await Connection.models.additionalComfort.findAll({
                    where: {
                        FK_rentObject: req.body.rentId,
                    },
                });

                res.status(200).json({
                    status: 'Success',
                    data: selectedComfort
                });

                return;
            } else {
                res.status(400).json({
                    status: 'Error',
                    data: 'Bad request!'
                });
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
