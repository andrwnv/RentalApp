import express from 'express';

import Connection from '../models/db_models';
import Client from '../models/types/client_type';


class ReportsController {
    async create(req: express.Request, res: express.Response) {
        try {
            if (req.body.objectReviewId && req.body.clientReviewId) {
                res.status(400).json({
                    status: 'Error',
                    data: 'Bad request!'
                });
            }

            const isReasonExist = await Connection.models.reportReasons.findOne({
                where: {
                    id: req.body.reasonId
                }
            })

            if (!isReasonExist) {
                res.status(400).json({
                    status: 'Error',
                    data: 'Incorrect reason!'
                });
            }

            let report = undefined;

            const client: Client = req.user as Client;

            if (req.body.objectReviewId) {
                report = await Connection.models.reports.create({
                    FK_client: client.id,
                    FK_reason: req.body.reasonId,
                    FK_objectReview: req.body.objectReviewId
                });
            } else if (req.body.clientReviewId) {
                report = await Connection.models.reports.create({
                    FK_client: client.id,
                    FK_reason: req.body.reasonId,
                    FK_clientReview: req.body.clientReviewId
                });
            }

            res.status(200).json({
                status: 'Success',
                data: report
            });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async reasons(req: express.Request, res: express.Response) {
        try {
            const reasons = await Connection.models.reportReasons.findAll({
                attributes: ['id', 'name', 'description']
            });

            res.status(200).json({
                status: 'Success',
                data: reasons
            });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }
}

export const ReportsCtrl = new ReportsController();
