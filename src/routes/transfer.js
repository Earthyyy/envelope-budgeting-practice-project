const router = require('express').Router();




// TODO: Implement the transfer logic
router.post('/',(req,res) => {
    const {from,to,amount} = req.body;
    res.send(`<h2>Transfering ${amount} from ${from} to ${to}</h2>`);
})













module.exports.transferRouter = router;