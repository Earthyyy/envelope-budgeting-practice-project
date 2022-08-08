const router = require('express').Router();
const validator = require('validator');
const {
    getAllEnvelopes,
    addNewEnvelope,
    getEnvelopeById,
    updateEnvelopeById,
    deleteEnvelopeById
} = require('../utils/utils');



// GET all envelopes route
router.get('/',(req,res) => {
    res.status(200).json(getAllEnvelopes());
})

// GET envelopes by ID route
router.get('/:Id',(req,res) => {
    let {Id} = req.params;
    if (validator.isInt(Id)) {
        const envId = parseInt(Id);
        const filteredEnvelopes = getEnvelopeById(envId);
        if (filteredEnvelopes.length === 0) return res.status(404).json({message: 'Envelope not found'});
        res.status(200).json(filteredEnvelopes[0]);
    } else {
        res.status(404).json({
            message: 'Page not found'
        })
    }
})

// POST an envelope ROUTE
router.post('/',(req,res) => {
    const {category,amount} = req.body;

    if (!validator.isEmpty(category)) {
        const amountToFloat = amount ? amount : 0;
        const createdEnvelope = addNewEnvelope(category,amountToFloat);

        res.status(201).json({
            message: 'Envelope created successfully!',
            createdEnvelope
        })
    } else {
        res.status(400).json({
            message: 'Invalid Request! Please verify your inputs!'
        })
    }
})

// UPDATE an envelope ROUTE
router.put('/:Id',(req,res) => {
    const {Id} = req.params;
    const {category,extract} = req.body;
    if (validator.isInt(Id) && (category || extract)) {
        const updatedEnvelope = updateEnvelopeById(parseInt(Id),category,extract);
        if (updatedEnvelope) {
            res.status(201).json({
                message: 'Envelope updated successfully!',
                updatedEnvelope
            })
        } else {
            res.status(400).json({message: 'Bad request! Please verifiy your inputs'});
        }
    } else {
        res.status(400).json({message: 'Bad request! Please verifiy your inputs'});
    }
})

// DELETE an envelope ROUTE
router.delete('/:Id',(req,res) => {
    const {Id} = req.params;
    if (validator.isInt(Id)) {
        if (deleteEnvelopeById(parseInt(Id))) res.status(204).send();
        else res.status(404).json({message: 'Envelope not found!'});
    } else {
        res.status(400).json({message: 'Bad request! Please verifiy your inputs'});
    }
})


module.exports.envelopeRouter = router;