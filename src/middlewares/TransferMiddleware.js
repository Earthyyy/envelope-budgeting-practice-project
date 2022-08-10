// Imports
let db = require('../database/index');



async function validateTransferInput(req,res,next) {
    const {from,to,amount} = req.body;

    if (!isNaN(from) 
    && !isNaN(to) 
    && !isNaN(amount)) {

        // Parsing inputs
        req.body = {
            from: parseInt(from),
            to: parseInt(to),
            amount: parseFloat(amount)
        }
 
        if (req.body.from === req.body.to) return res.status(400).json({message: "The Origin and Destination envelope should'nt be the same"})

        const originEnvelope = await db.query('SELECT balance FROM envelopes WHERE id = $1',[
            req.body.from
        ]);

        const destinationEnvelope = await db.query('SELECT balance FROM envelopes WHERE id = $1',[
            req.body.to
        ]);

        // Checking if both envelopes exist
        if (!originEnvelope.rowCount || !destinationEnvelope.rowCount) return res.status(400).json({message: "Either the origin's id or the destination's id is invalid"});
        
        // Verifiying if origin's balance is greater than the amount to transfer
        if (originEnvelope.rows[0].balance < amount) return res.status(400).json({message: "The amount entered exceeds the origin envelope's balance"});


        return next();
    } else {
        return res.status(400).json({message: "One or more fields are invalid!"});
    }

}


module.exports = {
    validateTransferInput
}