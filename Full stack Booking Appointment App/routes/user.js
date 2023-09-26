const express = require('express');

const router = express.Router();

const {addUser, getUser, deleteUser} = require('../controllers/user')

router.post('/add-user', addUser);

router.get('/get-user', getUser);

router.delete('/delete-user/:userId', deleteUser);

module.exports = router;