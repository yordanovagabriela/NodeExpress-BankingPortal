const express = require('express');
const router = express.Router();

const { accounts, writeJSON } = require('../data');

router.get('/transfer', (request, response) => {
    response.render('transfer');
});

router.post('/transfer', (request, response) => {
    accounts[request.body.from].balance -= parseInt(request.body.amount);
    accounts[request.body.to].balance += parseInt(request.body.amount);

    writeJSON();

    response.render('transfer', { message: 'Transfer Completed' });
});

router.get('/payment', (request, response) => {
    response.render('payment', { account: accounts.credit });
});

router.post('/payment', (request, response) => {
    accounts.credit.balance -= parseInt(request.body.amount);
    accounts.credit.available += parseInt(request.body.amount);

    writeJSON();

    response.render('payment', { message: "Payment Successful", account: accounts.credit });
});

module.exports = router;