const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const cors = require('cors');
const User = require('./models/user');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(cors());

const userRoutes = require('./routes/user')

app.use('/user', userRoutes);

sequelize.sync()
.then((result) => {
    console.log('Successfull')
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})