const express = require('express');
const shortid = require('shortid');
const User = require('../dbsetup/schema');

const createRouter = express.Router();

createRouter.post('/', async function(req, res){
    const userPost = req.body.username;
    try{
        let user = new User({username: userPost});
        await user.save();
        return res.status(201).json({'username': user.username, '_id': user._id});
    }
    catch(err){
        console.error(`[postcreate.js] Server error: ${err.message}`);
        return res.status(500).json(`Server error: ${err.message}`);
    }
});

module.exports = createRouter;
