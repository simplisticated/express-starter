import { configDotenv } from 'dotenv';
import app from './app';

/*
 * To ensure that all environment data is ready for usage, this line should be placed first.
 */
configDotenv();

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
