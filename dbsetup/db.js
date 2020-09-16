const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://christian:k2GOoBlcAoeSSuQ9@fcc-cluster.repma.mongodb.net/test?retryWrites=true&w=majority';
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
