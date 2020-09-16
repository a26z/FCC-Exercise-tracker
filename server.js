const express = require('express');
const app = express();
const shortid = require('shortid');
const cors = require('cors');
const mongoose = require('mongoose');
const mongoDb = require('mongodb');
const bodyParser = require('body-parser');
const connectDB = require('./dbsetup/db');
const exSchema = require('./dbsetup/schema');
const postCreate = require('./routes/post-create');
const postAdd = require('./routes/post-add');
const getUsers = require('./routes/get-users');
const getLogs = require('./routes/get-logs');

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || 'http://localhost:' + PORT;

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/public', express.static(process.cwd() + '/public'));
app.get('/', function(req, res){
    res.sendFile(process.cwd() + '/views/index.html');
});

app.use('/api/exercise/new-user/', postCreate);
app.use('/api/exercise/add/', postAdd);
app.use('/api/exercise/users/', getUsers);
app.use('/api/exercise/log', getLogs);

app.listen(PORT, function(){
    console.log(`Node running and listening on port ${PORT}. URL ------> ${BASE_URL}`);
});

connectDB();
