import express from 'express';

import Client from '../../models/types/client_type';

const isAdminUser = (req: express.Request, res: express.Response): boolean => {
    const reqUser: Client = req.user as Client;

    if (!reqUser) {
        res.status(400).json({
            status: 'Error',
            data: 'No req user data!'
        });

        return false;
    }

    if (reqUser.clientType.typeName !== 'admin') {
        res.status(403).json({
            status: 'Error',
            data: 'Request forbidden!'
        });

        return false;
    }

    return true;
}

export default isAdminUser;
