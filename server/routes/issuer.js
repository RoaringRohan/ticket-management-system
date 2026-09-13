const express = require('express');
const router = express.Router();

router.get('', async (req,res)=>{
    db.query(`SELECT * FROM issuer`,(err,results)=>{
        if (err) return res.status(500).send(err)
        return res.send(results);
    });
});

module.exports = router;