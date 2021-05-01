import express from 'express';
import multer from 'multer';
import cloudinary from '../services/cloudinary';
import Connection from '../models/db_models';
import Client from '../models/types/client_type';

class UploadFilesController {
    async uploadUserAvatar(req: express.Request, res: express.Response) {
        try {
            if (req.user == undefined) {
                res.status(404).json({
                    status: 'Error',
                    data: 'Cant find client data'
                })

                return;
            }

            const file = req.file;
            const userID = (req.user as Client).id;

            cloudinary.uploader.upload_stream({public_id: `user_avatar_${userID}`}, async (err, result) => {
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
}

export const UploadFileCtrl = new UploadFilesController();
