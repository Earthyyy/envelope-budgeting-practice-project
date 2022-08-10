// Imports
const router = require('express').Router();
const {
    getAllEnvelopes,
    addNewEnvelope,
    getEnvelopeById,
    updateEnvelopeById,
    deleteEnvelopeById
} = require('../controllers/EnvelopesController');

const {
checkEnvelopeAvailabilityById,
checkEnvelopeIfAlreadyExists,
validateUserInput,
checkEnvelopeIfAlreadyExistsUpdate,
validateUpdateEnvelopeInput
} = require('../middlewares/EnvelopeMiddleware');

const {transactionRouter} = require('./transaction');



router.param('Id',checkEnvelopeAvailabilityById)


// GET all envelopes route
router.get('/',getAllEnvelopes);

// GET envelopes by ID route
router.get('/:Id',getEnvelopeById);

// POST an envelope ROUTE
router.post('/',validateUserInput,checkEnvelopeIfAlreadyExists,addNewEnvelope)

// UPDATE an envelope ROUTE
router.put('/:Id',validateUpdateEnvelopeInput,checkEnvelopeIfAlreadyExistsUpdate,updateEnvelopeById);

// DELETE an envelope ROUTE
router.delete('/:Id',deleteEnvelopeById);

router.use('/:Id/transaction',transactionRouter);

// Exports
module.exports.envelopeRouter = router;