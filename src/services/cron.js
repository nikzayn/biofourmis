var cron = require('node-cron');

const getCovidList = require('./subscribers');


function cronjob(dbConn) {
    cron.schedule('0 */06 * * *', () => {
        console.log('started running')

    // Get Query
    const query2 = 'SELECT email from subscribers'
    dbConn.query(query2, (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            getCovidList(res.rows);
        }
    });
    }, {
        scheduled: true,
        timezone: 'Asia/Kolkata',
    });
}

module.exports = cronjob;