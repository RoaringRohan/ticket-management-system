const express = require('express');
const router = express.Router();


router.get('/role/:username', async (req, res) => {
    db.query(`SELECT * FROM manager WHERE username = "${req.params.username}"`, (em, rm) => {
        if (em) return res.status(500).send(em.sqlMessage);
        if (rm.length > 0) return res.send({title: "Manager"});
        db.query(`SELECT * FROM issuer WHERE username = "${req.params.username}"`, (ei, ri) => {
            if (ei) return res.status(500).send(ei.sqlMessage);
            if (ri.length > 0) return res.send({title: "Issuer"});
            db.query(`SELECT * FROM technician WHERE username = "${req.params.username}"`, (et, rt) => {
                if (et) return res.status(500).send(et.sqlMessage);
                if (rt.length > 0) return res.send({title: "Technician"});
            });
        });
    });
});

router.get('/:username/:password', async (req,res)=> {
    db.query(`(SELECT employeeID, accessLevel, name, phoneNumber, email, computerID, departmentName FROM manager WHERE username = "${req.params.username}" AND password = "${req.params.password}")
    UNION
    (SELECT employeeID, accessLevel, name, phoneNumber, email, computerID, departmentName FROM technician WHERE username = "${req.params.username}" AND password = "${req.params.password}")
    UNION
    (SELECT employeeID, accessLevel, name, phoneNumber, email, computerID, departmentName FROM issuer WHERE username = "${req.params.username}" AND password = "${req.params.password}")`, (err, requests) => {
        if (err) return res.status(400).send(err.sqlMessage);
        if (requests.length == 0) return res.status(403).send('Username or password are wrong.');
        return res.send(requests[0]);
    });

});

module.exports = router;