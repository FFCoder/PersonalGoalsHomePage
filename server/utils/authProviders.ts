import * as passport from 'passport';
import * as PassportLocal from 'passport-local';
import * as crypto from 'crypto';
import { RunQuery } from '../utils/db';

const App_LocalStrategy = new PassportLocal.Strategy(
    async (username: string, password: string, next: Function) => {
        let user;
        try {
            user = RunQuery(`SELECT * FROM users WHERE username = ?`, [username]);
            if (user.length === 0) {
                return next(null, false, { message: 'Incorrect username or password' });
            }
        } catch (error) {
            return next(error);
        }
    }
)

passport.use(App_LocalStrategy);
