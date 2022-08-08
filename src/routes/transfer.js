// Imports
const router = require('express').Router();
const {transferBudget} = require('../utils/utils')


// the transfer logic
router.post('/',(req,res) => {
    const {from,to,amount} = req.body;
    if (from && to && amount) {
        if (transferBudget(from,to,amount)) res.status(200).json({message: 'Transaction completed successfully!'});
        else res.status(400).json({message: "Can't complete transaction! please check your informations"});
    } else {
        res.status(400).json({message: 'Invalid Request! Please check your inputs'});
    }
})



// Exports
module.exports.transferRouter = router;