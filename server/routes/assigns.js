const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.get('', async (req,res)=>{
    db.query(`SELECT * FROM assigns`,(err,results)=>{
        if (err) return res.status(500).send(err);
        return res.send(results);
    });
});

router.post('/assignTicket', [
    body('managerID').isInt().withMessage('Invalid manager ID.'),
    body('technicianID').isInt().withMessage('Invalid technician ID.'),
    body('ticketID').isInt().withMessage('Invalid ticket ID.')
], async (req, res) => {

    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).send(errors.errors[0].msg);
    }

    db.query(`INSERT INTO assigns VALUES(${req.body.managerID}, ${req.body.technicianID}, ${req.body.ticketID})`, (err, results) => {
        if (err) return res.status(400).send(err.sqlMessage);
        return res.send({res: results, msg: 'Inserted assigns.'})
    });

});

module.exports = router;