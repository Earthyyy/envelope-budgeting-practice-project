// Imports
const router = require('express').Router();
const {
    getTransactionByEnvelope, addTransaction
} = require('../controllers/TransactionController');

const {
    validateTransactionInput
} = require('../middlewares/TransactionMiddleware')

// GET /transaction ROUTE
router.get('/',getTransactionByEnvelope);


// POST /transaction ROUTE
router.post('/',validateTransactionInput,addTransaction);



// Exports
module.exports.transactionRouter = router;