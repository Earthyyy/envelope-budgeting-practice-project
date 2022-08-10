// Imports
const router = require('express').Router();
const {
    getTransactionByEnvelope, addTransaction
} = require('../controllers/TransactionController');

const {
    validateTransactionInput
} = require('../middlewares/TransactionMiddleware')



/**
 * @swagger
 * /api/v1/envelopes/{Id}/transaction:
 *      get:
 *          summary: Get a specific envelope transactions
 *          produces:
 *              - application/json
 *          tags:
 *              - Transactions
 *          parameters:
 *              - in: path
 *                name: Id
 *                description: envelope's id
 *                type: integer
 *                required: true
 *                example: 1
 *          responses:
 *              "200":
 *                  description: Returns a list of an envelope's transactions
 *              "500":
 *                  description: Server internal error
 *          
 */
router.get('/',getTransactionByEnvelope);


/**
 * @swagger
 * /api/v1/envelopes/{Id}/transaction:
 *      post:
 *          summary: Perform a transaction from an envelope
 *          produces:
 *              - application/json
 *          tags:
 *              - Transactions
 *          parameters:
 *              - in: path
 *                name: Id
 *                description: envelope's id
 *                type: integer
 *                required: true
 *                example: 1
 *          requestBody:
 *              description: Transaction details
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              amount:
 *                                  type: number
 *                              receipient:
 *                                  type: string
 *                          example:
 *                              amount: 10
 *                              receipient: Homeless
 *          responses:
 *              "201":
 *                  description: Transaction complete
 *              "400":
 *                  description: Invalid inputs
 *              "404":
 *                  description: Envelope not found
 *              "500":
 *                  description: Server internal error
 */
router.post('/',validateTransactionInput,addTransaction);



// Exports
module.exports.transactionRouter = router;