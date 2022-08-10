// Imports
const router = require('express').Router();
const {validateTransferInput} = require('../middlewares/TransferMiddleware');
const {transferBalance} = require('../controllers/TransferController')


// POST /transfer ROUTE
router.post('/',validateTransferInput,transferBalance)



// Exports
module.exports.transferRouter = router;