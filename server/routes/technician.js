const express = require('express');
const router = express.Router();

router.get('', async (req,res)=>{
    db.query(`SELECT * FROM technician`,(err,results)=>{
        if (err) return res.status(500).send(err)
        return res.send(results);
    });
});

router.get('/maxSalary/:level', async (req, res) => {
    if (isNaN(req.params.level)) {
        return res.status(400).send('Invalid level');
    }
    db.query(`SELECT MAX(salary) AS salary FROM technician WHERE accessLevel = ${req.params.level}`, (err, results) => {
        if (err) return res.status(400).send(err.sqlMessage);
        return res.send(results[0]);
    });
});

module.exports = router;