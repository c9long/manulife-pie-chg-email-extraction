const jq = require('node-jq');
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const axios = require('axios');
// const http = require('http');
// const arg1 = process.argv[2];


app.get('/', function (req, res) {
    if (!req.query.chgTicket) {
        res.send('No change ticket provided');
        console.log('No change ticket provided');
    } else {
        const apiUrl = 'https://change-ticket.apps.cac.pcf.manulife.com/api/getPendingApprovers/' + req.query.chgTicket;
        const filter = '.[] | .email';
        axios.get(apiUrl).then((response) => {
            for (const approver of response.data) {
                if (approver.email) {
                    res.write(approver.email + ';');
                    console.log("Email logged");
                }
            }
            console.log('All emails logged!');
            res.end();
        }).catch((error) => {
            console.error(error);
        });
    }
});

let httpServ = app.listen(port, () => {
    console.log("Server is running at port " + port);
});
