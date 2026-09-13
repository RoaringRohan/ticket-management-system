const express = require('express');
const router = express.Router();

router.get('', async (req,res)=>{
    db.query(`SELECT * FROM manager`,(err,results)=>{
        if (err) return res.status(500).send(err.sqlMessage)
        return res.send(results);
    });
});

router.get('/availableTechs/:departmentName', async (req, res) => {
    db.query(`SELECT * FROM technician WHERE departmentName = "${req.params.departmentName}" AND operating = "T"`, (err, results) => {
        if (err) return res.status(500).send(err.sqlMessage)
        return res.send(results);
    });
});

module.exports = router;