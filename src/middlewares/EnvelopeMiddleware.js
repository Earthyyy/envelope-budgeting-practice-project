// Imports
let db = require('../database/index');
const validator = require('validator');





// Id parameter middleware
async function checkEnvelopeAvailabilityById(req,res,next,id) {
    if (validator.isInt(id)) {
        req.id = id;
    } else {
        return res.status(400).json({message: 'Id must be an integer'});
    }
    try {
        const {rows} = await db.query(`SELECT categories.name, envelopes.balance FROM categories, envelopes
        WHERE categories.id = envelopes.category_id AND envelopes.id = $1;`,[req.id]);

        if (rows.length) {
            req.envelope = rows[0];
            return next();
        }
        return res.status(404).json({message: 'Envelope not found!'});
    } catch (error) {
        return res.status(500).json({message: 'Internal Server Error!'});
    }
}


// POST middlewares
function validateUserInput(req,res,next) {
    const {category,amount} = req.body;

    if ((typeof category == 'string' 
    && category.length > 0)
    && (amount === undefined 
    || !isNaN(amount))) {
        req.body = {
            category: category.toLowerCase(),
            amount: amount === undefined ? 0 : parseFloat(amount)
        }

        return next();
    } else {
        res.status(400).json({message: 'Either category or amount is invalid, please check your inputs!'})
    }
}

async function checkEnvelopeIfAlreadyExists(req,res,next) {
    
    try {
        const {rows} = await db.query('SELECT name FROM categories WHERE name = $1',[req.body.category]);
        if (rows.length) return res.status(400).json({
            message: 'Category already exists!'
        });
        
        return next();
    } catch (error) {
        console.log('[checkEnvelopeIfAlreadyExists] Query Error!')
        res.status(500).json({
            message: 'Server internal Error!'
        })
    }
    
}

// PUT middlewares
function validateUpdateEnvelopeInput(req,res,next) {
    const {category,amount} = req.body;
    if ((typeof category === 'string' 
    && category.length > 0) 
    || !isNaN(amount)) {
        if (!isNaN(amount)) {
            req.body.amount = parseFloat(amount);
            req.body.isAmount = true;
        } 
        if (typeof category === 'string') {
            req.body.category = category.toLowerCase();
            req.body.isCategory = true;
        }

        return next();
    } else {
       return res.status(400).json({message: 'Please provide atleast one valid parameter'})
    }
}

async function checkEnvelopeIfAlreadyExistsUpdate(req,res,next) {
    const {isCategory,category} = req.body;
    try {
        if (isCategory) {
            const {rows} = await db.query('SELECT name FROM categories WHERE name = $1',[category]);
            if (rows.length) return res.status(400).json({
                message: 'Category already exists!'
            });
        }
        
        return next();
    } catch (error) {
        console.log('[checkEnvelopeIfAlreadyExists] Query Error!')
        res.status(500).json({
            message: 'Server internal Error!'
        })
    }
    
}





// Exports
module.exports = {
    checkEnvelopeAvailabilityById,
    checkEnvelopeIfAlreadyExists,
    validateUserInput,
    checkEnvelopeIfAlreadyExistsUpdate,
    validateUpdateEnvelopeInput
}