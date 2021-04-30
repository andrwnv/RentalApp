import express from 'express';
import { SentMessageInfo } from 'nodemailer';
import jwt from 'jsonwebtoken';

import Connection from '../models/db_models';
import { body, validationResult } from 'express-validator';
import { generateMD5 } from '../utils/MD5_generator';
import { sendMail } from '../utils/send_mail';


class UserController {
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

    async show(req: express.Request, res: express.Response): Promise<void> {
        try {
            const userId = req.params.id;

            const user = await Connection.models.clients.findOne({
                where: {
                    id: userId
                },
                attributes: {
                    exclude: ['password', 'confirmHash', 'FK_clientType'],
                },
                include: [{
                    model: Connection.models.clientType,
                    required: true,
                    attributes: ['typeName']
                }]
            });

            if ( user ) {
                res.status(200).json({
                    status: 'Success',
                    data: user
                });
            }
            else {
                res.status(404).json({
                    status: 'Error',
                    data: 'User not found!'
                });
            }

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

            const isUniqueUser = await Connection.models.clients.count({
                where: {
                    eMail: req.body.eMail
                }
            });

            if ( isUniqueUser != 0 ) {
                res.status(409).json({
                    status: 'Error',
                    data: 'User already exist!'
                });

                return;
            }

            const clientType = await Connection.models.clientType.findOne({
                where: { typeName: 'default_user' }
            });

            if ( !clientType ) {
                res.status(500).json({
                    status: 'Error',
                    data: 'Cant find client type!'
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
                password: generateMD5(process.env.SECRET_KEY + req.body.password),
                confirmHash: generateMD5(process.env.SECRET_KEY + req.body.eMail),
                photoLink: 'default_pic',
                rating: 5,
                FK_clientType: clientType.get('id')
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

            res.status(201).json({
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
        try {
            const userEMail = req.query.eMail;

            const user = await Connection.models.clients.findOne({
                where: {
                    eMail: userEMail
                }
            });

            if ( user ) {
                await user.destroy();

                res.status(200).json({
                    status: 'Success',
                    data: 'User deleted!'
                });
            }
            else {
                res.status(400).json({
                    status: 'Success',
                    data: 'User doesnt exist!'
                });
            }
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async verify(req: express.Request, res: express.Response): Promise<void> {
        try {
            const userHash = req.query.hash;

            const user = await Connection.models.clients.findOne({
                where: {
                    confirmHash: userHash
                }
            });

            if ( user ) {
                const isUserConfirmed = user.get('eMailConfirmed');

                if ( isUserConfirmed ) {
                    res.status(200).json({
                        status: 'Success',
                        data: 'E-Mail already confirmed!'
                    });
                    return;
                }

                await user.update({
                    eMailConfirmed: true
                });

                res.status(200).json({
                    status: 'Success',
                    data: {
                        message: 'E-Mail confirmed',
                    }
                });
            }
            else {
                res.status(400).json({
                    status: 'Error',
                    data: 'User doesnt exist!'
                });
            }
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async loginConfirmed(req: express.Request, res: express.Response): Promise<void> {
        try {
            if (req.user == undefined) {
                res.status(404).json({
                    status: 'Error',
                    data: 'Cant find client data'
                })

                return;
            }

            res.status(200).json({
                status: 'Success',
                data: {
                    client_data: req.user,
                    token: jwt.sign({ data: req.user },
                        process.env.SECRET_KEY || "SomeSecretKey",
                        {expiresIn: '30 days'})
                }
            });

        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async getCurrentUserInfo(req: express.Request, res: express.Response): Promise<void> {
        try {
            if (req.user == undefined) {
                res.status(404).json({
                    status: 'Error',
                    data: 'Cant find client data'
                })

                return;
            }

            res.status(200).json({
                status: 'Success',
                data: req.user
            });

        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }
}

export const UserCtrl = new UserController();
