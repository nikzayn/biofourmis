const axios = require('axios');
const _ = require('lodash');

const mailer = require('./mailer');

// @type GET
// @route /covid/list
// @desc Get the data of covid cases in India
// access PUBLIC
function getCovidList(emailData) {
    const api = 'https://api.covid19india.org/data.json';

    function getData() {
        axios.get(api)
            .then(response => {
                const result = response.data.statewise
                statewise(result);
            })
            .catch(err => console.log(err))
    }

    //- Total number of cases overall in country
    //- New Cases overall in country
    //- Statewise Data
    function statewise(data) {
        const totalCasesOverall = data[0].confirmed
        const newCasesOverall = data[0].deltaconfirmed

        const stateWiseData = _.map(data, (val =>
            stateData = {
                state_name: val.state,
                new_cases: val.deltaconfirmed,
                total_cases: val.confirmed
            }))

        const apiData = {
            totalCasesOverall,
            newCasesOverall,
            stateWiseData,
        }
        mailer(emailData, apiData)
    }

    getData();
}

module.exports = getCovidList;