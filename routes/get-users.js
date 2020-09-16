const express = require('express');
const mongoose = require('mongoose');
const Users = require('../dbsetup/schema');

const getUsers = new express.Router();

getUsers.get('/', async function(req, res) {
    try {
        let users = await Users.find({}).select({
            'username': 1
        }); // "_id" included by default.
        return res.status(200).json(users);
    } catch {
        return res.status(500).json({
            "error": "There is some internal error."
        });
    }
});

module.exports = getUsers;
