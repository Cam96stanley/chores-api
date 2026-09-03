import express, { type Express } from 'express';
import handleError from './middleware/errorHandler.js';
import familiesRouter from './routes/families.routes.js';
import familyMembersRouter from './routes/familyMember.routes.js';
import usersRouter from './routes/users.routes.js';

const app: Express = express();

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/families', familiesRouter);
app.use('/api/family-members', familyMembersRouter);

app.use(handleError);

export default app;
