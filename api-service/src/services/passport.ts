import { Strategy as JWTStrategy, ExtractJwt as ExtractJWT } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import dotenv from 'dotenv';

import Connection from '../models/db_models';
import { generateMD5 } from '../utils/MD5_generator';

dotenv.config();

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromHeader('token'),
        secretOrKey: process.env.SECRET_KEY
    },
    async(jwtPayload, done) => {
        try {
            const client = await Connection.models.clients.findOne({
                where: {
                    id: jwtPayload.data.id,
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

            if (client) {
                done(null, client);
                return;
            }

            done(null, false);
        } catch(err) {
            done(err, false);
        }
    }
));

passport.use(new LocalStrategy(
    { usernameField: 'eMail', passwordField: 'password' },
    async(email, password, done): Promise<void> => {
        try {
            const client = await Connection.models.clients.findOne({
                where: {
                    eMail: email
                },
                attributes: {
                    exclude: ['confirmHash', 'FK_clientType'],
                },
                include: [{
                    model: Connection.models.clientType,
                    required: true,
                    attributes: ['typeName']
                }]
            });

            if ( !client ) {
                done(null, false);
                return;
            }

            if ( client.get('password') === generateMD5(process.env.SECRET_KEY + password) ) {
                done(null, client);
                return;
            }

            done(null, false);
        } catch(err) {
            done(err, false);
        }
    }
));

passport.serializeUser((client: any, done) => {
    done(null, client.id);
});

passport.deserializeUser((id: number, done) => {
    Connection.models.clients.findOne({
        where: {
            id: id
        }
    }).then((client: any) => {
        if ( client == null ) {
            done(new Error('Wrong client id'), client);
        }
    });
});

export default passport;
