const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const cors = require('cors');
const Expense = require('./models/expense'); 

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const expenseRoute = require('./routes/expense');
app.use('/expense', expenseRoute); 

sequelize.sync()
    .then(() => {
        app.listen(3000);
        console.log('Successful!');
    })
    .catch(err => {
        console.log(err);
    });
