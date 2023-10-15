import compression from 'compression';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import express from 'express';
import helmet from 'helmet';

/*
 * To ensure that all environment data is ready for usage, this line should be placed first.
 */
configDotenv();

const createApp = () => {
    const app = express();
    app.use(cors());
    app.use(compression());

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
    app.use((error: any, request: express.Request, response: express.Response) => {
        console.error(error);
        response.status(500).send('Internal server error.');
    });
    return app;
};

const setupEndpoints = (app: express.Express) => {
    app.get('/', (request: express.Request, response: express.Response) => {
        response.send('Hello!');
    });
};

const port = process.env.PORT ?? 3000;

const app = createApp();
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
