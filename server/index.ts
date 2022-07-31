import * as express from 'express';
import * as LocalAuth from './utils/authProviders';
import UsersRouter from './routes/users';

const app = express();

app.use('/users', UsersRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
