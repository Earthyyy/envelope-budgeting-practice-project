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



/**
 * @swagger
 * /api/v1/envelopes:
 *    get:
 *      summary: Get all envelopes
 *      produces:
 *          - application/json
 *      tags:
 *          - Envelopes
 *      responses:
 *          "200":
 *              description: Returns a list of all envelopes
 *          "500":
 *              description: Internal server error
 */
router.get('/',getAllEnvelopes);



/**
 * @swagger
 * /api/v1/envelopes/{Id}:
 *    get:
 *          summary: Get an envelope by Id
 *          produces:
 *              - application/json
 *          tags:
 *              - Envelopes
 *          parameters:
 *              - in: path
 *                name: Id
 *                description: envelope's id
 *                type: integer
 *                required: true
 *                example: 1
 *          responses:
 *              "200": 
 *                  description: Returns a single envelope with its data
 *              "400":
 *                  description: Id must be an integer
 *              "404":
 *                  description: Envelope not found
 *              "500":
 *                  description: Internal server error
 */
router.get('/:Id',getEnvelopeById);




/**
 * @swagger
 * /api/v1/envelopes:
 *    post:
 *          summary: Creates a new envelope
 *          produces: 
 *              - application/json
 *          tags:
 *              - Envelopes
 *          requestBody:
 *              description: new envelope's data
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              category:
 *                                  type: string
 *                              amount:
 *                                  type: number
 *                          example:
 *                              category: gaming
 *                              amount: 20
 *          responses:
 *              "201":
 *                  description: Returns a success message
 *              "500":
 *                  description: Internal server error
 */
router.post('/',validateUserInput,checkEnvelopeIfAlreadyExists,addNewEnvelope)



/**
 * @swagger
 * /api/v1/envelopes/{Id}:
 *     put:
 *          summary: Updates an existing envelope
 *          produces:
 *              - application/json
 *          tags:
 *              - Envelopes
 *          parameters:
 *              - in: path
 *                name: Id
 *                description: envelope's id
 *                type: integer
 *                required: true
 *                example: 3
 *          requestBody:
 *              description: new envelope's data
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              category:
 *                                  type: string
 *                              amount:
 *                                  type: number
 *                          example:
 *                              category: household
 *                              amount: 48
 *                                  
 *          responses:
 *              "201":
 *                  description: Envelope updated
 *              "400":
 *                  description: Id must be an integer
 *              "404":
 *                  description: Envelope not found
 *              "500":
 *                  description: Internal server error
 */
router.put('/:Id',validateUpdateEnvelopeInput,checkEnvelopeIfAlreadyExistsUpdate,updateEnvelopeById);


/**
 * @swagger
 * /api/v1/envelopes/{Id}:
 *    delete:
 *         summary: delete an existing envelope
 *         produces:
 *              - application/json
 *         tags:
 *              - Envelopes
 *         parameters:
 *              - in: path
 *                name: Id
 *                description: envelope's id
 *                type: integer
 *                required: true
 *                example: 3
 *         responses:
 *              "204":
 *                  description: Envelope deleted
 *              "400":
 *                  description: Id must be an integer
 *              "404":
 *                  description: Envelope not found
 *              "500":
 *                  description: Internal server error
 *        
 */
router.delete('/:Id',deleteEnvelopeById);

router.use('/:Id/transaction',transactionRouter);

// Exports
module.exports.envelopeRouter = router;