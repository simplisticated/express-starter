import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import setupEndpoints from './endpoints';

const app = express();
app.use(cors());

/*
 * Implementation of security practices recommended by Express framework maintainers.
 * For more information, visit: https://expressjs.com/en/advanced/best-practice-security.html
 */
app.disable('x-powered-by');
app.use(helmet());

setupEndpoints(app);

/*
 * Custom "not found" message.
 */
app.use((request, response) => {
    response.status(404).send('Not found.');
});

/*
 * Custom error handler.
 */
app.use((error: any, request: Request, response: Response) => {
    console.error(error);
    response.status(500).send('Internal server error.');
});

export default app;
