const express = require('express');
const User = require('../models/user');

exports.addUser =  async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;

        console.log(req.body)

        const newUser = await User.create({
            name: name,
            email: email,
            phone: phone,
        });

        console.log('Successfully saved!');
        res.status(201).json({ newUserDetails: newUser });
    } catch (err) {
        console.error('Error in postUser:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getUser = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ allUsers: users }); 
    } catch (err) {
        console.log('Error at getUser:', err);
        res.status(500).json({ error: err });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            console.log('User ID not found');
            return res.status(400).json({ error: 'User ID not found' });
        }

       
        await User.destroy({ where: { id: userId } });

        res.sendStatus(200);
    } catch (err) {
        console.error('Error while deleting user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}