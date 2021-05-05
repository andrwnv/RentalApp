import express from 'express';
import { validationResult } from 'express-validator';

import Connection from '../models/db_models';
import Client from '../models/types/client_type';

class RentingAdsController {
    async index(req: express.Request, res: express.Response) {
        try {
            const count = req.query.count as string;
            const padding = (req.query.padding || 0) as string;

            if (!count) {
                const rentedObjects = await Connection.models.object.findAll({
                    order: [
                        ['id', 'DESC'],
                    ],
                    offset: parseInt(padding)
                });

                res.status(400).json({
                    status: 'Error',
                    data: rentedObjects
                });

                return;
            }

            const rentedObjects = await Connection.models.object.findAll({
                order: [
                    ['id', 'ASC'],
                ],
                limit: parseInt(count),
                offset: parseInt(padding)
            });

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

    async newAd(req: express.Request, res: express.Response) {
        try {
            const validationErrors = validationResult(req);

            if ( !validationErrors.isEmpty() ) {
                res.status(400).json({
                    status: 'Error',
                    data: validationErrors.array()
                });

                return;
            }

            const landlord = req.user as Client;
            const currentDate = new Date();

            const country = await Connection.models.country.findOne({ where: { name: req.body.country } });
            const street = await Connection.models.street.findOne({ where: { name: req.body.street } });
            const localityType = await Connection.models.localityType.findOne({ where: { name: req.body.localityType } });
            const locality = await Connection.models.locality.findOne({ where: { name: req.body.locality } });
            const objectType = await Connection.models.objectType.findOne({ where: { typeName: req.body.objectType } });

            if ( !country || !street || !localityType || !locality || !objectType ) {
                res.status(400).json({
                    status: 'Error',
                    data: 'Cant find: country || street || localityType || locality || objectType'
                });

                return;
            }

            const adData = {
                FK_landLord: landlord.id,
                title: req.body.title,
                description: req.body?.description,
                price: req.body.price,
                rating: 0,
                createDate: currentDate.toISOString(),
                updateDate: currentDate.toISOString(),
                mediaLinks: { urls: [] },
                createMediaDate: currentDate.toISOString(),
                updateMediaDate: currentDate.toISOString(),
                FK_country: country.get('id'),
                FK_locality: locality.get('id'),
                FK_localityType: localityType.get('id'),
                FK_street: street.get('id'),
                FK_objectType: objectType.get('id'),
                houseNumber: req.body.houseNumber,
            };

            const _newAd = await Connection.models.object.create(adData);

            res.status(200).json({
                status: 'Success',
                data: {
                    item_id: _newAd.get('id'),
                    landlord: {
                        id: landlord.id,
                        fullName: `${landlord.firstName} ${landlord.lastName}`,
                        clientType: landlord.clientType
                    },
                    title: req.body.title,
                    description: req.body?.description,
                    price: req.body.price,
                    rating: 0,
                    createDate: currentDate.toISOString(),
                    updateDate: currentDate.toISOString(),
                    mediaLinks: {},
                    createMediaDate: currentDate.toISOString(),
                    updateMediaDate: currentDate.toISOString(),
                    landData: {
                        landType: {
                            id: objectType.get('id'),
                            name: objectType.get('typeName'),
                        },
                        country: {
                            id: country.get('id'),
                            name: country.get('name'),
                        },
                        locality: {
                            id: locality.get('id'),
                            name: locality.get('name'),
                            localityType: {
                                id: localityType.get('id'),
                                name: localityType.get('name'),
                            }
                        },
                        street: {
                            id: street.get('id'),
                            name: street.get('name'),
                        },
                        houseNumber: req.body.houseNumber
                    }
                }
            });
        } catch(err) {
            console.log(err);

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

    async update(_: express.Request, __: express.Response) {

    }

    async userAds(_: express.Request, __: express.Response) {

    }
}

export const RentingAdsCtrl = new RentingAdsController();
