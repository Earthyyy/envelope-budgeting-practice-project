// Imports + Variables
const express = require('express');
const {envelopeRouter} = require('./src/routes/envelopes');
const {transferRouter} = require('./src/routes/transfer');
// const {swaggerRouter} = require('./src/routes/docs')
const swagger = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const PORT = process.env.PORT || 3000;

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Envelope Budgeting API",
            version: "1.0.0",
            descrription: "A basic API that allows clients to manage their personal budget.",
            license: {
                name: "MIT",
                url: "https://choosealicense.com/licenses/mit/"
            },
        },
    },
    apis: ["./src/routes/envelopes.js","./src/routes/transaction.js","./src/routes/transfer.js"]
};

const specs = swagger(swaggerOptions);


// Creating the express app
const app = express();

// Middleware to parse request bodies
app.use(express.json());


// Using the envelopeRouter for /envelopes PATH
app.use('/api/v1/envelopes',envelopeRouter);
// Using the transferRouter for /transfer PATH
app.use('/api/v1/transfer',transferRouter);
// Setting up the documentation page
app.use('/',swaggerUI.serve);
app.get("/",swaggerUI.setup(specs, {
    explorer: true
}))





// Server listening at PORT ...
app.listen(PORT,() => {
    console.log('Server listening at PORT : ' + PORT);
})













