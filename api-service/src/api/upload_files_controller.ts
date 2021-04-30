import express from 'express';
import multer from 'multer';
import cloudinary from '../services/cloudinary';


class UploadFilesController {
    async uploadImage(req: express.Request, res: express.Response) {
        try {
            if (req.user == undefined) {
                res.status(404).json({
                    status: 'Error',
                    data: 'Cant find client data'
                })

                return;
            }

            const file = req.file;

            //@ts-ignore
            const userID = req.user.id;

            cloudinary.uploader.upload_stream({public_id: `user_avatar_${userID}`}, (err, result) => {
                if ( err || !result ) {
                    return res.status(500).json({
                        status: 'Error',
                        data: err || 'Cant upload file!'
                    });
                }

                res.status(201).json({
                    status: 'Success',
                    data: {
                        title: 'File loaded to cloudinary',
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
