// Imports
let db = require('../database/index');

async function validateTransactionInput(req,res,next) {
    const {amount,receipient} = req.body;
    
    if (!isNaN(amount) &&
    (typeof receipient === 'string' && receipient.length)) {
        req.amount = parseFloat(amount);

        const {rows} = await db.query('SELECT balance FROM envelopes WHERE id = $1',[
            req.id
        ]);

        if (rows[0].balance < amount) return res.status(400).json({message: "The amount entered exceeds the envelope's balance"});
        return next();

    } else {
        res.status(400).json({message: 'Either one or both fields are invalid'});
    }
}


module.exports = {
    validateTransactionInput
}