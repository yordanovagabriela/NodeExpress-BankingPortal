const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));

const accountData = fs.readFileSync('./src/json/accounts.json', 'UTF8');
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync('./src/json/users.json', 'UTF8');
const users = JSON.parse(userData);

app.get('/', (request, response) => {
    response.render('index', {title: 'Account Summary', accounts: accounts});
});

app.get('/savings', (request, response) => {
    response.render('account', {account: accounts.savings});
});

app.get('/checking', (request, response) => {
    response.render('account', {account: accounts.checking});
});

app.get('/credit', (request, response) => {
    response.render('account', {account: accounts.credit});
});

app.get('/profile', (request, response) => {
    console.log(users[0]);
    response.render('profile', {user: users[0]});
});

app.get('/transfer', (request, response) => {
    response.render('transfer');
});

app.post('/transfer', (request, response) => {
    accounts[request.body.from].balance -= parseInt(request.body.amount);
    accounts[request.body.to].balance += parseInt(request.body.amount);

    const accountsJSON = JSON.stringify(accounts, null, 4);
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'UTF8');

    response.render('transfer', { message: 'Transfer Completed' });
});

app.get('/payment', (request, response) => {
    response.render('payment', { account: accounts.credit });
});

app.post('/payment', (request, response) => {
    accounts.credit.balance -= parseInt(request.body.amount);
    accounts.credit.available += parseInt(request.body.amount);

    const accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'UTF8');

    response.render('payment', { message: "Payment Successful", account: accounts.credit });
})

app.listen(3000, () => {
    console.log('PS Project Running on port 3000!');
});
