import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import Connection from '../models/db_models';
import { generateMD5 } from '../utils/MD5_generator';


passport.use(new LocalStrategy(
    { usernameField: 'eMail', passwordField: 'password' },
    async(email, password, done): Promise<void> => {
        try {
            const client = await Connection.models.clients.findOne({
                where: {
                    eMail: email
                }
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
            done(new Error('Wrong user id'), client);
        }
    });
});

export default passport;
