const mongoose = require('mongoose');
const shortid = require('shortid');

const exSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    username: String,
    count: Number,
    log: [{
        _id: false,
        description: String,
        duration: {type: Number},
        date: String
    }]
});

module.exports = mongoose.model('Exercise', exSchema);
