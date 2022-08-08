const envelopeRouter = require('express').Router();



// TODO : Implement GET all envelopes route
envelopeRouter.get('/',(req,res,next) => {
    res.send('<h2>Getting all envelopes</h2>');
})

// TODO : Implement GET envelopes by ID route
envelopeRouter.get('/:Id',(req,res,next) => {
    let {Id} = req.params;
    res.send('<h2>Getting an envelope with ID : ' + Id);
})

// TODO : Implement POST an envelope ROUTE
envelopeRouter.post('/',(req,res,next) => {
    res.send('<h2>Adding a new envelope</h2>');
})

// TODO : Implement UPDATE an envelope ROUTE
envelopeRouter.put('/:Id',(req,res) => {
    res.send('<h2>Updating an existing envelope</h2>');
})

// TODO : Implement DELETE an envelope ROUTE
envelopeRouter.delete('/:Id',(req,res) => {
    res.send('<h2>Deleting an envelope</h2>');
})


module.exports.envelopeRouter = envelopeRouter;