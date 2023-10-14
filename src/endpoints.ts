import express from 'express';

const setupEndpoints = (app: express.Express) => {
    app.get('/', (request, response) => {
        response.send('Hello!');
    });
};

export default setupEndpoints;
