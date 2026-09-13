const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const todayDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`
};

router.get('', async (req,res)=>{
    db.query(`SELECT * FROM ticket`,(err,results)=>{
        if (err) return res.status(500).send(err)
        return res.send(results);
    });
});

router.post('/create', [
    body('userID').isInt().withMessage('Invalid user ID.'),
    body('issuerID').isInt().withMessage('Invalid issuer ID.'),
    body('subject').isString().isLength({ min: 1 }).withMessage('Invalid Subject.'),
    body('description').isString().isLength({ min: 1 }).withMessage('Invalid Description.'),
    body('software').isString().isLength({ min: 1 }).withMessage('Invalid Software.'),
], async (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).send(errors.errors[0].msg);
    }

    db.query(`INSERT INTO ticket (subject, description, software, dateOpened, state, priorityLevel, userID, issuerID)
                VALUES ("${req.body.subject}", "${req.body.description}", "${req.body.software}", "${todayDate()}", "open", 1, ${req.body.userID}, ${req.body.issuerID})`, (err, results) => {
                    if (err) return res.status(400).send(err.sqlMessage);
                    return res.send(results)
                });
});

router.put('/technicianEdit', [
    body('technicianID').isInt().withMessage('Invalid technician ID.'),
    body('ticketID').isInt().withMessage('Invalid ticket ID.'),
    body('state').optional().isString().isLength({ min: 1 }).isIn(['closed', 'open', 'In Progress']).withMessage('Invalid State.'),
    body('techNotes').isString().isLength({ min: 1 }).withMessage('Invalid Technician Notes.').optional(),

], async (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).send(errors.errors[0].msg);
    }

    if (req.body.state && req.body.techNotes) {
        db.query(`UPDATE ticket SET techNotes = "${req.body.techNotes}", state = "${req.body.state}", dateClosed = ${req.body.state == 'closed' ? '"\""' + todayDate() + '"\""' : 'NULL'} WHERE ticketID = ${req.body.ticketID} AND technicianID = ${req.body.technicianID}`, (err, results) => {
            if (err) return res.status(400).send(err.sqlMessage);
            if (results.affectedRows == 0) return res.status(404).send('Ticket not found.');
            db.query(`SELECT * FROM ticket WHERE ticketID = "${req.body.ticketID}"`, (e, ticket) => {
                if (e) return res.status(500).send(e.sqlMessage);
                return res.send(ticket[0]);
            });
        });
    }
    else if (req.body.state) {
        db.query(`UPDATE ticket SET state = "${req.body.state}", dateClosed = ${req.body.state == 'closed' ? '"\""' + todayDate() + '"\""' : 'NULL'} WHERE ticketID = ${req.body.ticketID} AND technicianID = ${req.body.technicianID}`, (err, results) => {
            if (err) return res.status(400).send(err.sqlMessage);
            if (results.affectedRows == 0) return res.status(404).send('Ticket not found.');
            db.query(`SELECT * FROM ticket WHERE ticketID = "${req.body.ticketID}"`, (e, ticket) => {
                if (e) return res.status(500).send(e.sqlMessage);
                return res.send(ticket[0]);
            });
        });
    }
    else if (req.body.techNotes) {
        db.query(`UPDATE ticket SET techNotes = "${req.body.techNotes}" WHERE ticketID = ${req.body.ticketID} AND technicianID = ${req.body.technicianID}`, (err, results) => {
            if (err) return res.status(400).send(err.sqlMessage);
            if (results.affectedRows == 0) return res.status(404).send('Ticket not found.');
            db.query(`SELECT * FROM ticket WHERE ticketID = "${req.body.ticketID}"`, (e, ticket) => {
                if (e) return res.status(500).send(e.sqlMessage);
                return res.send(ticket[0]);
            });
        });
    }
});

router.get('/allClosed', async (req, res) => {
    db.query(`SELECT * FROM ticket WHERE state = "closed"`, (err, results) => {
        if (err) return res.status(500).send(err.sqlMessage);
        return res.send(results);
    });
});

router.get('/departmentsMost', async (req, res) => {
    db.query(`SELECT tech.departmentName, tick.software, COUNT(*) AS num_of_tickets
            FROM Technician tech, Ticket tick
            WHERE
                tech.employeeID = tick.technicianID AND
                (tick.state = "open" OR tick.state = "In progress")
            GROUP BY tech.departmentName, tick.software
            ORDER BY num_of_tickets DESC
            LIMIT 10;`, (err, results) => {
                if (err) return res.status(500).send(err.sqlMessage);
                return res.send(results);
            });
});

router.get('/technicianTickets/:technicianID', async (req, res) => {
    db.query(`SELECT * FROM ticket WHERE technicianID = ${req.params.technicianID} AND state != "closed"`, (err, results) => {
        if (err) return res.status(500).send(err.sqlMessage);
        return res.send(results);
    });
});



module.exports = router;