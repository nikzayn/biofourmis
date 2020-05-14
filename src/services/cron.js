var cron = require('node-cron');

const getCovidList = require('./subscribers');


function cronjob(data) {
    cron.schedule('* * * * *', () => {
        getCovidList(data);
    });
}

module.exports = cronjob;