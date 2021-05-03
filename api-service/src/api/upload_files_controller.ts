import express from 'express';
import _ from 'lodash';

import cloudinary from '../services/cloudinary';
import Connection from '../models/db_models';
import Client from '../models/types/client_type';
import { stringify } from 'querystring';
import { generateMD5 } from '../utils/MD5_generator';


class UploadFilesController {
    async uploadUserAvatar(req: express.Request, res: express.Response): Promise<void> {
        try {
            if ( req.user == undefined ) {
                res.status(404).json({
                    status: 'Error',
                    data: 'Cant find client data'
                })

                return;
            }

            const file = req.file;
            const userID = (req.user as Client).id;

            cloudinary.uploader.upload_stream({ public_id: `user_avatar_${userID}` }, async(err, result) => {
                if ( err || !result ) {
                    return res.status(500).json({
                        status: 'Error',
                        data: err || 'Cant upload file!'
                    });
                }

                const user = await Connection.models.clients.findOne({
                    where: {
                        id: userID
                    }
                });

                if ( user ) {
                    await user.update({
                        photoLink: result.url
                    });
                }

                res.status(201).json({
                    status: 'Success',
                    data: {
                        title: 'File loaded to cloudinary. Avatar successfully changed! ',
                        url: result.url,
                        width: result.width,
                        height: result.height,
                        format: result.format,
                        bytes_size: result.bytes,
                        created_at: result.created_at
                    }
                });
            }).end(file.buffer);

        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }

    async uploadAdPhotos(req: express.Request, res: express.Response): Promise<void> {
        try {
            const files: File[] | any = req.files;

            const land = await Connection.models.object.findOne({
                where: {
                    id: req.query.land_id
                }
            });

            if ( !land ) {
                res.status(400).json({
                    status: 'Error',
                    data: 'Land is not create!'
                });

                return;
            }

            const id = land.get('id') as string;

            const uploadPicture = (item: any): Promise<any> => {
                return new Promise<any>((resolve, reject) => {
                    cloudinary.uploader.upload_stream({
                        folder: `ad_${id}`,
                        public_id: `ad_${id}_${generateMD5(id + Math.random().toString())}`
                    }, (err, result) => {
                        if ( res ) {
                            resolve(result);
                        }
                        else {
                            reject(err);
                        }
                    }).end(item.buffer);
                });
            };

            for (const item of files) {
                uploadPicture(item).then((res) => {
                    const prevUrls = land.get('mediaLinks') as any;
                    let newData = { urls: [...prevUrls?.urls] };
                    newData.urls.push(res.url);

                    land.update({
                        mediaLinks: newData
                    });
                });
            }

            res.status(201).json({
                status: 'Success',
                data: {
                    title: 'Files loading to cloudinary.',
                }
            });
        } catch(err) {
            res.status(500).json({
                status: 'Error',
                data: err
            });
        }
    }
}

export const UploadFileCtrl = new UploadFilesController();
