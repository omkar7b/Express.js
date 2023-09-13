const express = require('express');
const router = express.Router();
const fs = require('fs');
router.get('/', (req, res) => {
    fs.readFile('message.text', (err, data) => {
        if (err) {
            data = "No Chat Exists";
            console.log(err)
        }
        res.send(`${data}<form action="/" method="POST" onsubmit="document.getElementById('username').value = localStorage.getItem('username') "><input id="message" type="text" name="message" placeholder="message"></input><input type="hidden" id="username" name="username"></input><button type="submit">Send</button></form>`);
    })
})

router.post('/', (req, res) => {
    fs.writeFile('message.text', `${req.body.username}:${req.body.message}`, { flag: 'a' }, (err) => {
        err ? console.log(err) : res.redirect('/');
    })
})

module.exports = router;