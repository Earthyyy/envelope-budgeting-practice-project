// Imports
let db = require('../database/index');



async function transferBalance(req,res) {
    const {from,to,amount} = req.body
    const client = await db.getClient();
    

    try {
        await client.query('BEGIN');
        // Subtracting amount from the origin envelope
        await client.query('UPDATE envelopes SET balance = balance - $1 WHERE id = $2;',[
            amount,from
        ]);

        // Adding amount to the destination envelope
        await client.query('UPDATE envelopes SET balance = balance + $1 WHERE id = $2;',[
            amount,to
        ]);

        (await client).query('COMMIT');
        return res.status(200).json({message: 'Amount transfered successfully!'});
    } catch (error) {
        (await client).query('ROLLBACK');
        return res.status(500).json({message: 'Internal Server Error'});
    } finally {
        client.release();
    }
}


module.exports = {
    transferBalance
}






