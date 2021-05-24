import express from 'express';

import Connection from '../models/db_models';
import Client from '../models/types/client_type';

const isNotLandlord = async (client: Client, objectId: number): Promise<boolean | undefined> => {
    const object = await Connection.models.object.findOne({
        where: {
            id: objectId
        }
    });

    if (object === null) {
        return undefined;
    }

    return object.get('FK_landLord') !== client.id;
}

class BookingController {
    async index(req: express.Request, res: express.Response) {
        try {
            const reservation = await Connection.models.bookedObject.findAll({
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

            res.status(200).json({
                status: 'Success',
                data: reservation
            });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async userReservations(req: express.Request, res: express.Response) {
        try {
            const client = req.user as Client;

            if (client === null) {
                res.status(400).json({
                    status: 'Error',
                    data: 'No user data!'
                });

                return;
            }

            const reservations = await Connection.models.bookedObject.findAll({
                where: {
                    FK_client: client.id
                },
                include: [{
                        model: Connection.models.object,
                }]
            });

            res.status(200).json({
                status: 'Success',
                data: reservations
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
            const client = req.user as Client;

            if (client === null) {
                res.status(400).json({
                    status: 'Error',
                    data: 'No user data!'
                });

                return;
            }

            if ( new Date(req.body.beginDate) < new Date() ||
                 new Date(req.body.endDate) <= new Date() ||
                 new Date(req.body.endDate) <= new Date(req.body.beginDate)) {

                res.status(400).json({
                    status: 'Error',
                    data: 'Incorrect dates!'
                });

                return;
            }

            if (! await isNotLandlord(client, req.body.objectId)) {
                res.status(403).json({
                    status: 'Error',
                    data: 'Landlord cant booking his object!'
                });

                return;
            }

            const bookingData = {
                beginDate: req.body.beginDate,
                endDate: req.body.endDate,
                FK_client: client.id,
                FK_object: req.body.objectId,
                confirmed: false
            };

            const reservation = await Connection.models.bookedObject.create(bookingData);

            res.status(200).json({
                status: 'Success',
                data: reservation
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
            const landLord = req.user as Client;

            if (landLord === null) {
                res.status(400).json({
                    status: 'Error',
                    data: 'No user data!'
                });

                return;
            }

            const reservation = await Connection.models.bookedObject.findOne({
                where: {
                    id: req.body.bookingId
                }
            });

            if (reservation === null) {
                res.status(400).json({
                    status: 'Error',
                    data: 'That reservation not found!'
                });

                return;
            }

            const isLandLordObject = await Connection.models.object.findOne({
                where: {
                    id: reservation.get('FK_object') as number,
                    FK_landLord: landLord.id
                }
            });

            if (isLandLordObject === null) {
                res.status(403).json({
                    status: 'Error',
                    data: 'Only land lord can delete reservation!'
                });

                return;
            }

            await reservation.destroy();

            res.status(200).json({
                status: 'Success',
                data: 'Reservation deleted!'
            });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async confirm(req: express.Request, res: express.Response) {
        try {
            const landLord = req.user as Client;

            if (landLord === null) {
                res.status(400).json({
                    status: 'Error',
                    data: 'No user data!'
                });

                return;
            }

            const reservation = await Connection.models.bookedObject.findOne({
                where: {
                    id: req.body.bookingId
                }
            });

            if (reservation === null) {
                res.status(400).json({
                    status: 'Error',
                    data: 'That reservation not found!'
                });

                return;
            }

            const isLandLordObject = await Connection.models.object.findOne({
                where: {
                    id: reservation.get('FK_object') as number,
                    FK_landLord: landLord.id
                }
            });

            if (isLandLordObject === null) {
                res.status(403).json({
                    status: 'Error',
                    data: 'Confirm by no land lord!'
                });

                return;
            }

            await reservation.update({
               confirmed: true
            });

            res.status(200).json({
                status: 'Success',
                data: 'Reservation confirmed!'
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
            // const landlord = req.user as Client;
            //
            // if (!landlord) {
            //     res.status(400).json({
            //         status: 'Error',
            //         data: 'Cant find user data'
            //     });
            //
            //     return;
            // }

            const reservation = await Connection.models.bookedObject.findOne({
                where: {
                    id: req.body.bookingId
                }
            });

            if (!reservation) {
                res.status(400).json({
                    status: 'Error',
                    data: 'Cant find reservation'
                });

                return;
            }

            const history = await Connection.models.userBookedHistory.create({
                beginDate: reservation.get('beginDate'),
                endDate: reservation.get('endDate'),
                FK_object: reservation.get('FK_object'),
                FK_client: reservation.get('FK_client')
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
}

export const BookingCtrl = new BookingController();
