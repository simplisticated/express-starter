import compression from "compression";
import cors from "cors";
import { configDotenv } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import http from "http";

/*
 * To ensure that all environment data is ready for usage, this line should be placed first.
 */
configDotenv();

let IS_READY_FOR_INCOMING_REQUESTS = false;

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
            console.log(
                request.method,
                request.url,
                request.body && Object.keys(request.body).length > 0
                    ? JSON.stringify(request.body, null, 2)
                    : ""
            );

            if (IS_READY_FOR_INCOMING_REQUESTS) {
                next();
            } else {
                response.status(500).send("Try again later.");
            }
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
}): Promise<http.Server> {
    return new Promise(resolve => {
        const server = configuration.app.listen(configuration.port, () => {
            resolve(server);
        });
    });
}

function setupConsole() {
    const getFormattedDate = () => {
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
        return formatter.format(currentDate);
    };
    const { log, error } = console;
    console.log = (message?: any, ...parameters: any[]) => {
        log(getFormattedDate());
        log(message, ...parameters);
        log();
    };
    console.error = (message?: any, ...parameters: any[]) => {
        log(`\x1b[35m${getFormattedDate()}`);
        error(`${message}`, ...parameters);
        log("\x1b[0m");
    };
}

(async () => {
    setupConsole();

    const app = createApp();
    const port = getServerPort();

    const server = await launchServer({
        app,
        port,
    });
    server.addListener("error", console.error);

    IS_READY_FOR_INCOMING_REQUESTS = true;
    console.log(`Server is listening on port ${getServerPort()}`);
})();
