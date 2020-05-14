const nodemailer = require("nodemailer");
const _ = require('lodash')

function mailer(data, apiData) {
    if (_.isEmpty(data)) {
        console.log("Empty subscriber's list")
        return
    }
    else {
        // declare vars,
        let fromMail = `${process.env.email}`;
        let toMail = _.map(data, val => val.email);
        let subject = 'Daily Updates for COVID-19 cases in India';
        let html = `
    <html>
    <head>
        <style>
          table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
        }
          th, td {
            padding: 5px;
            text-align: left;    
        }
        </style>    
    </head>
        <body>
            <div>
                <h2>Number of new cases in India yesterday - <span style="color: red">${apiData.newCasesOverall}</span><h2>
            </div>
            <div>
                <h2>Total number of cases - <span style="color: red">${apiData.totalCasesOverall}</span></h2>
            </div>
            <br>
            <div style="width:100%">
                <tr>
                    <th>States</th>
                    <th>New Cases</th>
                    <th>Total Cases</th>
                </tr>
                ${_.map(apiData.stateWiseData, (val) => (
            `<tr>
                        <td>${val.state_name}</td>
                        <td>${val.new_cases}</td>
                        <td>${val.total_cases}</td>
                      </tr>`
        )).join('')}
            </div>
        </body>
    </html>
    `
        //auth
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.email}`,
                pass: `${process.env.password}`
            }
        });

        //email options
        let mailOptions = {
            from: fromMail,
            to: toMail,
            subject,
            html
        };

        //send mail
        transporter.sendMail(mailOptions, (error, response) => {
            if (error) {
                console.log(error);
            }
            console.log(response)

        })
    }
}

module.exports = mailer;
