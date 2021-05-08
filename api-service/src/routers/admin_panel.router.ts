import express from 'express';
import dotenv from 'dotenv';

import AdminBroSequelize from '@admin-bro/sequelize';
import AdminBroExpress from '@admin-bro/express';
import AdminBro from 'admin-bro';

import Connection from '../models/db_models';
import { generateMD5 } from '../utils/MD5_generator';

dotenv.config();


const adminPanelRouter = express.Router();
AdminBro.registerAdapter(AdminBroSequelize);

const isModerator = ({ currentAdmin, _ }: any) => {
    return currentAdmin.clientType.typeName === 'moder' || currentAdmin.clientType.typeName === 'admin';
}

const isAdmin = ({ currentAdmin, _ }: any) => {
    return currentAdmin.clientType.typeName === 'admin';
}


const adminBro = new AdminBro({
    databases: [ Connection ],
    rootPath: '/admin',
    branding: {
        logo: 'https://res.cloudinary.com/rentalappclone/image/upload/c_scale,w_100/v1620461545/logomain.png',
        companyName: 'Rental App'
    },
    resources: [
        {
            resource: Connection.models.clients,
            options: {
                actions: {
                    edit: { isAccessible: isAdmin },
                    new: { isAccessible: isAdmin },
                    delete: { isAccessible: isAdmin },
                }
            }
        },
        {
            resource: Connection.models.clientType,
            options: {
                actions: {
                    edit: { isAccessible: isAdmin },
                    new: { isAccessible: isAdmin },
                    delete: { isAccessible: isAdmin },
                }
            }
        },
        {
            resource: Connection.models.clientPlannedTrips,
            options: {
                actions: {
                    edit: { isAccessible: isAdmin },
                    new: { isAccessible: isAdmin },
                    delete: { isAccessible: isAdmin },
                }
            }
        },
        {
            resource: Connection.models.objectReview,
            options: {
                actions: {
                    edit: { isAccessible: isModerator },
                    new: { isAccessible: isModerator },
                    delete: { isAccessible: isModerator },
                }
            }
        },
        {
            resource: Connection.models.clientReview,
            options: {
                actions: {
                    edit: { isAccessible: isModerator },
                    new: { isAccessible: isModerator },
                    delete: { isAccessible: isModerator },
                }
            }
        },
        {
            resource: Connection.models.bookedObject,
            options: {
                actions: {
                    edit: { isAccessible: isAdmin },
                    new: { isAccessible: isAdmin },
                    delete: { isAccessible: isAdmin },
                }
            }
        },
        {
            resource: Connection.models.userBookedHistory,
            options: {
                actions: {
                    edit: { isAccessible: isAdmin },
                    new: { isAccessible: isAdmin },
                    delete: { isAccessible: isAdmin },
                }
            }
        },
        {
            resource: Connection.models.rentedObject,
            options: {
                actions: {
                    edit: { isAccessible: isAdmin },
                    new: { isAccessible: isAdmin },
                    delete: { isAccessible: isAdmin },
                }
            }
        },
        {
            resource: Connection.models.userRentalHistory,
            options: {
                actions: {
                    edit: { isAccessible: isAdmin },
                    new: { isAccessible: isAdmin },
                    delete: { isAccessible: isAdmin },
                }
            }
        },
        {
            resource: Connection.models.object,
            options: {
                actions: {
                    edit: { isAccessible: isAdmin },
                    new: { isAccessible: isAdmin },
                    delete: { isAccessible: isAdmin },
                }
            }
        },
        {
            resource: Connection.models.objectType,
            options: {
                actions: {
                    edit: { isAccessible: isAdmin },
                    new: { isAccessible: isAdmin },
                    delete: { isAccessible: isAdmin },
                }
            }
        },
        {
            resource: Connection.models.additionalComfort,
            options: {
                actions: {
                    edit: { isAccessible: isAdmin },
                    new: { isAccessible: isAdmin },
                    delete: { isAccessible: isAdmin },
                }
            }
        },
        {
            resource: Connection.models.street,
            options: {
                actions: {
                    edit: { isAccessible: isAdmin },
                    new: { isAccessible: isAdmin },
                    delete: { isAccessible: isAdmin },
                }
            }
        },
        {
            resource: Connection.models.country,
            options: {
                actions: {
                    edit: { isAccessible: isAdmin },
                    new: { isAccessible: isAdmin },
                    delete: { isAccessible: isAdmin },
                }
            }
        },
        {
            resource: Connection.models.locality,
            options: {
                actions: {
                    edit: { isAccessible: isAdmin },
                    new: { isAccessible: isAdmin },
                    delete: { isAccessible: isAdmin },
                }
            }
        },
        {
            resource: Connection.models.localityType,
            options: {
                actions: {
                    edit: { isAccessible: isAdmin },
                    new: { isAccessible: isAdmin },
                    delete: { isAccessible: isAdmin },
                }
            }
        },
        {
            resource: Connection.models.reports,
            options: {
                actions: {
                    edit: { isAccessible: isModerator },
                    new: { isAccessible: isModerator },
                    delete: { isAccessible: isModerator },
                }
            }
        },
        {
            resource: Connection.models.reportReasons,
            options: {
                actions: {
                    edit: { isAccessible: isAdmin },
                    new: { isAccessible: isAdmin },
                    delete: { isAccessible: isAdmin },
                }
            }
        },
    ]
});

interface ClientType {
    typeName: string
}

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async(email: string, password: string) => {
        const user = await Connection.models.clients.findOne({
            where: {
                eMail: email
            },
            include: [{
                model: Connection.models.clientType,
                required: true,
                attributes: ['typeName']
            }]
        });

        if ( user ) {
            const matched = generateMD5(process.env.SECRET_KEY + password) === user.get('password');

            if ( matched && ((user.get('clientType') as ClientType).typeName === 'admin') ||
                (user.get('clientType') as ClientType).typeName === 'moder')
            {
                return user;
            }
        }
        return false;
    },

    cookiePassword: process.env.SECRET_KEY || 'some-secret-password-used-to-secure-cookie',
})

adminPanelRouter.use(adminBro.options.rootPath, router);

export default adminPanelRouter;