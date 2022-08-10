// Imports
let db = require('../database/index');




const getAllEnvelopes =  async (req,res) => {
    try {
        const {rows} = await db.query(`SELECT categories.name, envelopes.balance FROM categories, envelopes
        WHERE categories.id = envelopes.category_id;`);
        return res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({message: 'Internal Server Error!'});
    }
}



const getEnvelopeById = (req,res) => {
    res.status(200).json(req.envelope);
}


const addNewEnvelope = async (req,res) => {
    const {category,amount} = req.body;
    try {
        const categoryInsert = await db.query('INSERT INTO categories(name) VALUES($1) RETURNING id',[
            category
        ]);

        await db.query('INSERT INTO envelopes(category_id,balance) VALUES($1,$2);',[
            categoryInsert.rows[0].id,
            amount
        ]);
        
        res.status(201).send({message: 'Envelope created successfully'});
    } catch (error) {
        res.status(500).json({message: 'Server internal Error!'});
    }
}




const updateEnvelopeById = async (req,res) => {
    
    const {category,amount,isAmount,isCategory} = req.body;

    try {
        if (isAmount) {
            await db.query('UPDATE envelopes SET balance = $1 WHERE id = $2',[
                amount,req.id
            ])
        }

        if (isCategory) {
            await db.query(`UPDATE categories SET name = $1 WHERE id = (SELECT category_id
                FROM envelopes WHERE id = $2)`,[
                    category,req.id
                ])
        }

        return res.status(201).json({message: 'Envelope updated successfully'});
    } catch (error) {
        
        return res.status(500).json({message: 'Internal Server Error!'});
    }


}



const deleteEnvelopeById = async (req,res) => {
    try {
        await db.query(`DELETE FROM categories
        WHERE id = (SELECT category_id FROM envelopes WHERE id = $1)`,[
            req.id
        ])

        res.status(204).json({message: 'Envelope deleted successfully'});
    } catch (error) {
        res.status(500).json({message: 'Internal server error!'});
    }
}





// Exports
module.exports = {
    getAllEnvelopes,
    addNewEnvelope,
    getEnvelopeById,
    updateEnvelopeById,
    deleteEnvelopeById,
}