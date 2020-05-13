const express = require('express');
const { Pool } = require('pg')

let dbConn;
const app = express();
const port = 8080;

const subscribers = require('./routes/subscribers')

//Database Connection
function sqlConnection() {
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
    });
    dbConn = pool;
    console.log('DB Connected Successfully')
}

//Create Table
const db = require('./models/db');
function createTable() {
    for (var i = 0; i < db.length; i++) {
        dbConn.query(db[i], (err, res) => {
        });
    }
}

//DB Setup
function dbSetup() {
    sqlConnection();
    createTable()
}


//Add subscribers to the DB
app.get('/subscribers/list', (req, res) => {
    const email = req.query.email;
    const query = {
        text: 'INSERT INTO subscribers(email) VALUES($1)',
        values: [`${email}`]
    }

    dbConn.query(query, (err) => {
        if (err) {
            console.log(err.stack)
            return
        } else {
            res.send('Thanks for subscribing!!')
        }
    })
})

app.use('/covid', subscribers)

app.listen(port, () => {
    console.log(`Server started on ${port}`);
    dbSetup();
});



