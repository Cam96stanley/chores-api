import express, { type Express } from 'express';
import handleError from './middleware/errorHandler.js';
import familiesRouter from './routes/families.routes.js';
import usersRouter from './routes/users.routes.js';

const app: Express = express();

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/families', familiesRouter);

app.use(handleError);

export default app;
