const express = require('express');
const mongoose = require('mongoose');
const mongoDb = require('mongodb');
const Users = require('../dbsetup/schema');

const getLogs = new express.Router();

getLogs.get('/', async function(req, res) {
    try {
        let allLogs = await Users.findById(req.query.userId);
        console.log(allLogs.log);
        res.status(200).json(allLogs);
    } catch {
        return res.status(500).json({
            "error": "There is some internal error."
        });
    }
});

module.exports = getLogs;
