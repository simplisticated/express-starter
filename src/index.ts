import cors from 'cors';
import { configDotenv } from 'dotenv';
import express, { Request, Response } from 'express';
import helmet from 'helmet';

/*
 * To ensure that all environment data is ready for usage, this line should be placed first.
 */
configDotenv();

const app = express();
app.use(cors());

/*
 * Implementation of security practices recommended by Express framework maintainers.
 * For more information, visit: https://expressjs.com/en/advanced/best-practice-security.html
 */
app.disable('x-powered-by');
app.use(helmet());

app.get('/', (request: Request, response: Response) => {
    response.send('Hello!');
});

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

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
