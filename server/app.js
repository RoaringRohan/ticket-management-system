const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const mysql2 = require('mysql2');
const app = express();
app.use(express.json());

const PORT = 8080;

const db = mysql2.createConnection ({
    host: 'localhost',
    user: 'root',
    password: process.env.ROOTPASS,
    database: 'se3309'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

app.use('/api/assigns', require('./routes/assigns'));
app.use('/api/department', require('./routes/department'));
app.use('/api/issuer', require('./routes/issuer'));
app.use('/api/manager', require('./routes/manager'));
app.use('/api/technician', require('./routes/technician'));
app.use('/api/ticket', require('./routes/ticket'));
app.use('/api/user', require('./routes/user'));
app.use('/api/login', require('./routes/login'));

app.use("/", express.static('../web'))

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

