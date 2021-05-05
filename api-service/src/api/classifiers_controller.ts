import express from 'express';

import Connection from '../models/db_models';

class ClassifiersController {
    async allCountries(req: express.Request, res: express.Response) {
        try {
            const countries = await Connection.models.country.findAll();

            res.status(200).json({
                status: 'Success',
                data: countries
            });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async allLocalitiesTypes(req: express.Request, res: express.Response) {
        try {
            const localitiesTypes = await Connection.models.localityType.findAll();

            res.status(200).json({
                status: 'Success',
                data: localitiesTypes
            });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async allLocalities(req: express.Request, res: express.Response) {
        try {
            const localities = await Connection.models.locality.findAll();

            res.status(200).json({
                status: 'Success',
                data: localities
            });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async allStreets(req: express.Request, res: express.Response) {
        try {
            const streets = await Connection.models.street.findAll();

            res.status(200).json({
                status: 'Success',
                data: streets
            });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async allHouseTypes(req: express.Request, res: express.Response) {
        try {
            const objectTypes = await Connection.models.objectType.findAll();

            res.status(200).json({
                status: 'Success',
                data: objectTypes
            });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }
}

export const ClassifiersCtrl = new ClassifiersController();
