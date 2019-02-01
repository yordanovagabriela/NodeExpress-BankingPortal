const fs = require('fs');
const path = require('path');
const express = require('express');

const accountRoutes = require('./routes/accounts.js');
const servicesRoutes = require('./routes/services.js');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

const { accounts, users, writeJSON } = require('./data');

app.get('/', (request, response) => {
    response.render('index', {title: 'Account Summary', accounts: accounts});
});

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

app.get('/profile', (request, response) => {
    console.log(users[0]);
    response.render('profile', {user: users[0]});
});

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

app.listen(3000, () => {
    console.log('PS Project Running on port 3000!');
});
