let db = require('../database/index');




async function getTransactionByEnvelope(req,res)  {
    try {
        const transactions = await db.query(`SELECT categories.name as category, transactions.date, transactions.payment_amount, transactions.payment_receipient
        FROM categories, transactions, envelopes
        WHERE transactions.envelope_id = envelopes.id AND envelopes.category_id = categories.id AND transactions.envelope_id = $1;`,[
            req.id
        ]);
        return res.status(200).json(transactions.rows);  
    } catch (error) {
        return res.status(500).json({message: "Server internal error"});
    }
}


async function addTransaction(req,res) {
    const {amount,receipient} = req.body;
    const client = await db.getClient();

    try {
        await client.query('BEGIN');
        await client.query('UPDATE envelopes SET balance = balance - $1 WHERE id = $2;',[
            amount,req.id
        ]);

        await client.query('INSERT INTO transactions(envelope_id,date,payment_amount,payment_receipient) VALUES($1,NOW(),$2,$3);',[
            req.id,
            amount,
            receipient
        ]);

        await client.query('COMMIT');
        return res.status(201).json({message: 'Transaction complete'})
    } catch (error) {
        await client.query('ROLLBACK');
        return res.status(500).json({message: 'Internal Server Error'});
    } finally {
        client.release();
    }

}


module.exports = {
    getTransactionByEnvelope,
    addTransaction
}