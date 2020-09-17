const express = require('express');
const mongoose = require('mongoose');
const mongoDb = require('mongodb');
const Users = require('../dbsetup/schema');

const getLogs = new express.Router();

getLogs.get('/', async function(req, res) {
    try {
        let allLogs = await Users.findById(req.query.userId);
        allLogs.log.sort(function(a,b){
          return new Date(b.date) - new Date(a.date);
        });
        let {userId, from, to, limit} = req.query;
        dFrom = new Date(new Date(from).toDateString());
        dTo = new Date(new Date(to).toDateString());
        // from/to (html form) = 'YYYY-MM-DD'
        // date (DB) = 'ddd mmm DD YYYY'
        // new Date(from/to) = x
        // new Date(date) = x + 2hrs (getTimezoneOffset)
        //
        // new Date(from/to).toDateString() = 'ddd mmm DD YYYY'
        // new Date('ddd mmm DD YYYY') = needed Date object for comparison (no TimezoneOffset)
        if(from && to) {
            allLogs.log = allLogs.log.filter(el => new Date(el.date) >= dFrom && new Date(el.date) <= dTo);
        } else if(limit) {
            allLogs.log.splice(limit);
        }
        return res.status(200).json(allLogs);

    } catch {
        return res.status(500).json({
            "error": "There is some internal error."
        });
    }
});

module.exports = getLogs;
