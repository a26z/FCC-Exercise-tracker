const express = require('express');
const shortid = require('shortid');
const User = require('../dbsetup/schema');

const addRouter = new express.Router();

addRouter.post('/', async function(req, res) {
    let {
        userId,
        description,
        date,
        duration
    } = req.body;
    try {
        let foundId = await User.findOne({
            '_id': userId
        });

        let exDate;
        date ? exDate = new Date(date).toDateString() : exDate = new Date().toDateString();

        if (foundId) {
            let addExercise = {
                'description': description,
                'duration': Number(duration),
                'date': exDate
            };
            foundId.log.push(addExercise);
            foundId.count = foundId.log.length;
            await foundId.save();

            let response = {
                'username': foundId.username,
                'description': description,
                'duration': Number(duration),
                '_id': foundId._id,
                'date': exDate
            };
            // return res.status(201).json(response);
            res.json(response);


        } else {
            return res.status(400).json({
                "error": "ID " + userId + " not found."
            });
        }
    } catch (err) {
        return res.status(500).json("There is some internal error.");
    }
});

module.exports = addRouter;
