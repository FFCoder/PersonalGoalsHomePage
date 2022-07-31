import * as express from 'express';
import * as passport from 'passport';
import { RunQuery } from '../utils/db';

const UsersRouter = express.Router();

UsersRouter.get('/', passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/login'
  }), (req, res) => {
    res.send("Not Authorized");
})

UsersRouter.get("/success", (req, res) => {
    res.send("Authorized");
});

UsersRouter.get("/login", (req, res) => {
    res.send("Not Authorized");
});

export default UsersRouter;