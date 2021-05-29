import express from 'express';

import Connection from '../models/db_models';
import Client from '../models/types/client_type';

class RatingController {
    async add(req: express.Request, res: express.Response) {
        try {
            if ( (req.body.objectId && req.body.clientId)
                || ( !req.body.objectId && !req.body.clientId) || (req.body.clientId && req.body.isLandlord === null)
                || !req.body.rating || !req.body.review ) {
                res.status(400).json({
                    status: 'Error',
                    data: 'Incorrect request body data!'
                });

                return;
            }

            let review = undefined;

            if ( req.body.objectId ) {
                const object = await Connection.models.object.findOne({
                    where: {
                        id: req.body.objectId
                    }
                });

                if ( !object ) {
                    res.status(400).json({
                        status: 'Error',
                        data: 'Incorrect object data!'
                    });

                    return;
                }

                let reviewsCount = await Connection.models.objectReview.count({
                    where: {
                        FK_object: req.body.objectId
                    }
                });

                let ratingVal = Math.round(((object.get('rating') as number) + req.body.rating) / (reviewsCount === 0 ? 1 : reviewsCount + 1));

                if ( ratingVal > 10 ) {
                    ratingVal = 10;
                }

                review = await Connection.models.objectReview.create({
                    rating: req.body.rating,
                    review: req.body.review,
                    FK_client: (req.user as Client).id,
                    FK_object: req.body.objectId
                });

                await object.update({
                    rating: ratingVal
                });
            }
            else if ( req.body.clientId ) {
                const user = await Connection.models.clients.findOne({
                    where: {
                        id: req.body.clientId,
                    }
                });

                if ( !user ) {
                    res.status(400).json({
                        status: 'Error',
                        data: 'Incorrect user data!'
                    });

                    return;
                }

                let reviewsCount;
                if ( req.body.isLandlord ) {
                    reviewsCount = await Connection.models.clientReview.count({
                        where: {
                            FK_client: req.body.clientId,
                            isForLandLord: false
                        }
                    });
                }
                else {
                    reviewsCount = await Connection.models.clientReview.count({
                        where: {
                            FK_landLord: req.body.clientId,
                            isForLandLord: true
                        }
                    });
                }

                let ratingVal = Math.round(((user.get('rating') as number) + req.body.rating) / (reviewsCount === 0 ? 1 : 2));

                if ( ratingVal > 10 ) {
                    ratingVal = 10;
                }

                if ( req.body.isLandlord ) {
                    review = await Connection.models.clientReview.create({
                        rating: req.body.rating,
                        review: req.body.review,
                        FK_client: user.get('id') as number,
                        FK_landLord: (req.user as Client).id,
                        isForLandLord: false
                    });
                }
                else {
                    review = await Connection.models.clientReview.create({
                        rating: req.body.rating,
                        review: req.body.review,
                        FK_client: (req.user as Client).id,
                        FK_landLord: user.get('id') as number,
                        isForLandLord: true
                    });
                }

                await user.update({
                    rating: ratingVal
                });
            }

            res.status(200).json({
                status: 'Success',
                data: review
            });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async objectReview(req: express.Request, res: express.Response) {
        try {
            let reviews = await Connection.models.objectReview.findAll({
                where: {
                    FK_object: req.query.objectId,
                },
                include: [{
                    model: Connection.models.clients,
                    attributes: ['firstName', 'lastName', 'photoLink']
                }]
            });

            res.status(200).json({
                status: 'Success',
                data: reviews
            });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async clientReview(req: express.Request, res: express.Response) {
        try {
            let reviews = await Connection.models.clientReview.findAll({
                where: {
                    FK_client: req.query.client,
                    isForLandLord: req.query.isForLord
                },
                include: [{
                    model: Connection.models.clients,
                    attributes: ['firstName', 'lastName', 'photoLink']
                }]
            });

            let reviews2 = await Connection.models.clientReview.findAll({
                where: {
                    FK_landLord: req.query.client,
                    isForLandLord: true
                },
                include: [{
                    model: Connection.models.clients,
                    attributes: ['firstName', 'lastName', 'photoLink']
                }]
            });

            const _res = reviews.concat(...reviews2);

            res.status(200).json({
                status: 'Success',
                data: _res
            });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async updateRent(req: express.Request, res: express.Response) {
        try {
            const data = await Connection.models.rentedObject.findOne({
                where: {
                    id: req.body.rentId
                }
            });

            if (!data) {
                res.status(400).json({
                    status: 'Error',
                    data: 'incorrect rent data'
                });

                return;
            }

            await data.update({
                 rating: req.body.rating
            });

            res.status(200).json({
                status: 'Success',
                data: 'Done!'
            });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async updateRentHist(req: express.Request, res: express.Response) {
        try {
            const data = await Connection.models.userRentalHistory.findOne({
                where: {
                    id: req.body.historyId
                }
            });

            if (!data) {
                res.status(400).json({
                    status: 'Error',
                    data: 'incorrect rent data'
                });

                return;
            }

            await data.update({
                rating: req.body.rating
            });

            res.status(200).json({
                status: 'Success',
                data: 'Done!'
            });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async updateBookHist(req: express.Request, res: express.Response) {
        try {
            const data = await Connection.models.userBookedHistory.findOne({
                where: {
                    id: req.body.historyId
                }
            });

            if (!data) {
                res.status(400).json({
                    status: 'Error',
                    data: 'incorrect rent data'
                });

                return;
            }

            await data.update({
                rating: req.body.rating
            });

            res.status(200).json({
                status: 'Success',
                data: 'Done!'
            });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }
}

export const RatingCtrl = new RatingController();
