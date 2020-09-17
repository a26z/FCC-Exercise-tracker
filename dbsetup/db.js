const MONGO_URI = require('./mongo-uri');
// const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://<user>:<password>@fcc-cluster.repma.mongodb.net/<db>?retryWrites=true&w=majority';
// // Replace above with your <username>, <password> and <db>.
const mongoose = require('mongoose');

const connectDB = async function(){
    try{
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true
        });
        console.log('Connected to Database.');
    } catch(err) {
        console.error(err.message);
    }
};

module.exports = connectDB;
