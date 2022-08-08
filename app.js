// Import Section
const express = require('express');
const {envelopeRouter} = require('./src/routes/envelopes');
const {transferRouter} = require('./src/routes/transfer');
const {data} = require('./src/database/data');


// Initializations
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse request bodies
app.use(express.json());


// Using the envelopeRouter for /envelopes PATH
app.use('/envelopes',envelopeRouter);
// Using the transferRouter for /transfer PATH
app.use('/transfer',transferRouter);

// Setting up the default page
app.get('/',(req,res) => {
    res.send('<h1>Envelope Budgeting API<h1>');
})




// Server listening at PORT ...
app.listen(PORT,() => {
    console.log('Server listening on PORT : ' + PORT);
})













