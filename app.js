// Import Section
const express = require('express');
const {envelopeRouter} = require('./src/routes/envelopes');
const {data} = require('./src/database/data');

// Initializations
const app = express();
const PORT = process.env.PORT || 3000;




// Using the envelopeRouter for /envelopes PATH
app.use('/envelopes',envelopeRouter);

// Setting up the default page
app.get('/',(req,res) => {
    res.send('<h1>Envelope Budgeting API<h1>');
})







// Server listening...
app.listen(PORT,() => {
    console.log('Server listening on PORT : ' + PORT);
})













