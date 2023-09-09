const http = require('http');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.use('/', (req, res, next) => {
    console.log('This always runs');
    next();
});

app.use('/add-product', (req, res, next) => {
    console.log('In another middleware!');
    res.send('<form action="/product" method="POST"> <input type="text" name="size" placeholder="Product Size"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

// Add middleware to parse the request body
app.use(express.urlencoded({ extended: false }));

app.use('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/', (req, res, next) => {
    console.log('In another middleware!');
    res.send('<h1>hello to node js</h1>');
});

const server = http.createServer(app);

server.listen(3000);
