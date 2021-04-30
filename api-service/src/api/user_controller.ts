import express from 'express';
import { SentMessageInfo } from 'nodemailer';

import Connection from '../models/db_models';
import { validationResult } from 'express-validator';
import { generateMD5 } from '../utils/MD5_generator';
import { sendMail } from '../utils/send_mail';


class User_controller {
    async index(_: express.Request, res: express.Response) {
        try {
            const users = await Connection.models.clients.findAll();

            res.status(200).json({
                status: 'Success',
                data: users
            });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async create(req: express.Request, res: express.Response): Promise<void> {
        try {
            const validationErrors = validationResult(req);

            if ( !validationErrors.isEmpty() ) {
                res.status(400).json({
                    status: 'Error',
                    data: validationErrors.array()
                });

                return;
            }

            const userData = {
                firstName: req.body.firstName,
                middleName: req.body.middleName,
                lastName: req.body.lastName,
                eMail: req.body.eMail,
                birthDay: req.body.birthDay,
                phoneNumber: req.body.phoneNumber,
                password: req.body.password,
                confirmHash: generateMD5(process.env.SECRET_KEY || Math.random().toString()),
                photoLink: 'default_pic',
                rating: 5,
            };

            const user = await Connection.models.clients.create(userData);

            sendMail({
                from: 'admin@airbnb_clone.com',
                to: userData.eMail,
                subject: 'E-Mail confirm [AIRBNB CLONE]',
                body: `Follow link for confirm <a href="http://localhost:${process.env.PORT || 3080}/client/signup/verify?hash=${userData.confirmHash}"> FOLLOW ME! </a>`,
                callback: (err: Error | null, info: SentMessageInfo) => {
                    err ? console.log(err) : console.info(info);
                }
            });

            res.status(200).json({
                status: 'Success',
                data: user
            })
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async update(req: express.Request, res: express.Response): Promise<void> {

    }

    async delete(req: express.Request, res: express.Response): Promise<void> {

    }
}

export const UserCtrl = new User_controller();
