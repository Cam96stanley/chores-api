import express, { type Express } from 'express';
import helloRouter from './routes/hello.routes.js';

const app: Express = express();

app.use(express.json());

app.use('/api/hello', helloRouter);

export default app;
