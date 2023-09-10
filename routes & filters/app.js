const http = require('http');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

// Add middleware to parse the request body
app.use(express.urlencoded({ extended: false }));

app.use('/admin', adminRouter);
app.use(shopRouter);

app.get('/', (req, res, next) => {
    console.log('In another middleware!');
    res.send('<h1>hello to node js</h1>');
});

// Move the 404 handler to the end
app.use((req, res, next) => {
    res.status(404).send("<h1>Page Not Found</h1>");
});

const server = http.createServer(app);

server.listen(3000);
