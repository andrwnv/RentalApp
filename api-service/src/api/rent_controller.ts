import express from 'express';

import Connection from '../models/db_models';
import Client from '../models/types/client_type';


const calcTotalPrice = (beginDate: Date, endDate: Date, oneDayPrice: number, products: any[]) => {
    let totalSum = oneDayPrice;

    products.forEach(val => {
        totalSum += parseInt(val.get('price'));
    });

    const oneDay = 24 * 60 * 60 * 1000;
    const dayCount = Math.round(Math.abs((beginDate.getTime() - endDate.getTime()) / oneDay)) + 1;

    return totalSum * dayCount;
}

class RentController {
    async index(req: express.Request, res: express.Response) {
        try {
            const rentData = await Connection.models.rentedObject.findOne({
                where: {
                    FK_object: req.params.id
                },
                include: [
                    {
                        model: Connection.models.object,
                        required: true,
                    },
                    {
                        model: Connection.models.clients,
                        required: true,
                        attributes: ['firstName', 'lastName', 'id']
                    },
                ]
            });

            if ( !rentData ) {
                res.status(400).json({
                    status: 'Error',
                    data: 'Cant find rend data'
                });

                return;
            }

            res.status(200).json({
                status: 'Success',
                data: rentData
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
            const rentData = await Connection.models.rentedObject.findOne({
                where: {
                    id: req.body.rentId
                }
            });

            if ( !rentData ) {
                res.status(400).json({
                    status: 'Error',
                    data: 'Cant find rend data!'
                });

                return;
            }

            await rentData.destroy();

            res.status(200).json({ status: 'Success' });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async moveFromBooking(req: express.Request, res: express.Response) {
        try {
            const reservation = await Connection.models.bookedObject.findOne({
                where: {
                    id: req.body.bookingId
                },
            });

            if ( !reservation ) {
                res.status(400).json({
                    status: 'Error',
                    data: 'Bad request!'
                });

                return;
            }

            const object = await Connection.models.object.findOne({
                where: {
                    id: reservation.get('FK_object') as number
                }
            });

            if ( !object ) {
                res.status(400).json({
                    status: 'Error',
                    data: 'Cant find object!'
                });

                return;
            }

            const additionalComfortProps = await Connection.models.additionalComfort.findAll({
                where: {
                    FK_bookingObject: req.body.bookingId as number
                }
            });

            const rentData = await Connection.models.rentedObject.create({
                beginDate: reservation.get('beginDate') as string,
                endDate: reservation.get('endDate') as string,
                price: calcTotalPrice(new Date(reservation.get('beginDate') as string), new Date(reservation.get('endDate') as string),
                    object.get('price') as number, additionalComfortProps),
                FK_client: reservation.get('FK_client'),
                FK_object: object.get('id')
            });

            res.status(200).json({
                status: 'Success',
                data: rentData
            });

        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async moveToHistory(req: express.Request, res: express.Response) {
        try {
            const rentData = await Connection.models.rentedObject.findOne({
                where: {
                    id: req.body.rentId
                }
            });

            if ( !rentData ) {
                res.status(400).json({
                    status: 'Error',
                    data: 'Cant find rend data'
                });

                return;
            }

            const history = await Connection.models.userRentalHistory.create({
                beginDate: rentData.get('beginDate'),
                endDate: rentData.get('endDate'),
                FK_object: rentData.get('FK_object'),
                FK_client: rentData.get('FK_client')
            });

            res.status(200).json({
                status: 'Success',
                data: history
            });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async userHistory(req: express.Request, res: express.Response) {
        try {
            const client = req.user as Client;

            if ( !client ) {
                res.status(400).json({
                    status: 'Error',
                    data: 'Cant find user data'
                });
            }

            const rentData = await Connection.models.userRentalHistory.findAll({
                where: {
                    FK_client: client.id
                },
                include: [{
                    model: Connection.models.object
                }]
            });

            res.status(200).json({
                status: 'Success',
                data: rentData
            });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }
}

export const RentCtrl = new RentController();
