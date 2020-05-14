var cron = require('node-cron');

const getCovidList = require('./subscribers');


function cronjob(dbConn) {
    cron.schedule('* * * * *', () => {

    // Get Query
    const query2 = 'SELECT email from subscribers'

    dbConn.query(query2, (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            getCovidList(res.rows);
        }
    })
    });
}

module.exports = cronjob;