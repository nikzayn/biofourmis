const express = require('express');
const { Pool } = require('pg')

let dbConn;
const app = express();
const port = 8080;

const cronJob = require('./services/cron');

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
    pool.connect((err, client, release) => {
        if (err) {
          console.error('Error acquiring client', err.stack);
          setTimeout(sqlConnection, 1000);
          return;
        }
        console.log('DB Connected Successfully')
        release();
      })
}

//Create Table
const db = require('./models/db');
function createTable() {
    for (var i = 0; i < db.length; i++) {
        dbConn.query(db[i], (err, res) => {});
    }
}

//DB Setup
function dbSetup() {
    sqlConnection();
    createTable()
}


// Add subscribers to the DB
// Get Query from the DB
// - Inside db query, we will start the cron service
let subscribersEmailID;
app.get('/subscribers/list', (req, res) => {
    const email = req.query.email;

    // Insert Query
    const query1 = {
        text: 'INSERT INTO subscribers(email) VALUES($1)',
        values: [`${email}`]
    }

    dbConn.query(query1, (err) => {
        if (err) {
            console.log(err.stack)
            return
        } else {
            res.send('Thanks for subscribing!!')
        }
    })

})


//Server Setup
app.listen(port, () => {
    console.log(`Server started on ${port}`);
    dbSetup();
    cronJob(dbConn);
});



