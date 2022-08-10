// Imports
const router = require('express').Router();
const {validateTransferInput} = require('../middlewares/TransferMiddleware');
const {transferBalance} = require('../controllers/TransferController')



/**
 * @swagger
 * /api/v1/transfer:
 *      post:
 *          summary: Transfers budget from an envelope to another
 *          produces:
 *              - application/json
 *          tags:
 *              - Transfer
 *          requestBody:
 *              description: Transfer details
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              from:
 *                                  type: integer
 *                              to:
 *                                  type: integer
 *                              amount:
 *                                  type: integer
 *          responses:
 *              "200":
 *                  description: Amount transfered
 *              "400":
 *                  description: Invalid inputs
 *              "500":
 *                  description: Server internal error
 *              
 */
router.post('/',validateTransferInput,transferBalance)



// Exports
module.exports.transferRouter = router;