const express = require('express');

const path = require('path');

const router = express.Router();

const rootDir = require('../util/path'); 

router.get('/', (req, res, next) => {
    console.log('In another middleware!');
    //res.send('<h1>hello to node js</h1>');
    res.sendFile(path.join(rootDir,'views','shop.html'));
});

module.exports = router;