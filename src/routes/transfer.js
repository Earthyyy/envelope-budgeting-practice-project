// Imports
const router = require('express').Router();
const {validateTransferInput} = require('../middlewares/TransferMiddleware');
const {transferBalance} = require('../controllers/TransferController')


// the transfer logic
router.post('/',validateTransferInput,transferBalance)



// Exports
module.exports.transferRouter = router;