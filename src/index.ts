import compression from 'compression';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
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

    app.use(express.json());

    const shouldLogRequests = process.env.LOG_REQUESTS === 'true';

    if (shouldLogRequests) {
        app.use((request: Request, response: Response, next: NextFunction) => {
            console.log(new Date().toLocaleString());
            console.log(`${request.method} ${request.url}`);
            if (request.body && Object.keys(request.body).length > 0) console.log(request.body);
            next();
        });
    }

    setupEndpoints(app);

    /*
     * Custom "not found" message.
     */
    app.use((request: Request, response: Response) => {
        response.status(404).send('Not found.');
    });

    /*
     * Custom error handler.
     */
    app.use((error: any, request: Request, response: Response) => {
        console.error(error);
        response.status(500).send('Internal server error.');
    });
    return app;
};

const setupEndpoints = (app: express.Express) => {
    app.get('/', (request: Request, response: Response) => {
        response.send('Hello!');
    });
};

const port = process.env.PORT ?? 3000;

const app = createApp();
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
