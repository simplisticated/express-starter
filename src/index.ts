import compression from "compression";
import cors from "cors";
import { configDotenv } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";

/*
 * To ensure that all environment data is ready for usage, this line should be placed first.
 */
configDotenv();

function createApp() {
    const app = express();
    app.use(cors());
    app.use(compression());

    /*
     * Implementation of security practices recommended by Express framework maintainers.
     * For more information, visit: https://expressjs.com/en/advanced/best-practice-security.html
     */
    app.disable("x-powered-by");
    app.use(helmet());

    app.use(express.json());

    const shouldLogRequests = process.env.LOG_REQUESTS === "true";

    if (shouldLogRequests) {
        app.use((request: Request, response: Response, next: NextFunction) => {
            console.log(`${request.method} ${request.url}`);
            if (request.body && Object.keys(request.body).length > 0) {
                console.log(request.body);
            }
            next();
        });
    }

    setupEndpoints(app);

    /*
     * Custom "not found" message.
     */
    app.use((request: Request, response: Response) => {
        response.status(404).send("Not found.");
    });

    /*
     * Custom error handler.
     */
    app.use((error: any, request: Request, response: Response) => {
        console.error(error);
        response.status(500).send("Internal server error.");
    });
    return app;
}

function setupEndpoints(app: express.Express) {
    app.get("/", (request: Request, response: Response) => {
        response.send("Hello!");
    });
}

function getServerPort(): number {
    const stringValue = process.env.PORT;
    const port = stringValue ? parseInt(stringValue, 10) : undefined;
    const defaultValue = 3000;
    return port && !Number.isNaN(port) ? port : defaultValue;
}

function launchServer(configuration: {
    app: express.Express;
    port: number;
}): Promise<void> {
    return new Promise<void>(resolve => {
        configuration.app.listen(configuration.port, () => {
            resolve();
        });
    });
}

function setupConsole() {
    const createWrapper =
        (sourceFunction: (message?: any, ...parameters: any[]) => void) =>
        (message?: any, ...parameters: any[]) => {
            const currentDate = new Date();
            const options: Intl.DateTimeFormatOptions = {
                timeZone: "UTC",
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
            };
            const formatter = new Intl.DateTimeFormat(undefined, options);
            const formattedDate = formatter.format(currentDate);

            sourceFunction(formattedDate);
            sourceFunction(message, ...parameters);
            sourceFunction();
        };

    const { log, error } = console;
    console.log = createWrapper(log);
    console.error = createWrapper(error);
}

(async () => {
    setupConsole();

    const app = createApp();
    const port = getServerPort();

    await launchServer({
        app,
        port,
    });
    console.log(`Server is listening on port ${getServerPort()}`);
})();
