const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Post = require('./models/post');
const postRoutes = require('./routes/posts');


const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = 'index.html';

app.use(express.static(DIST_DIR))

mongoose.connect('mongodb+srv://admin2:Db1234@mycluster-civw3.mongodb.net/test?retryWrites=true&w=majority')
// mongoose.connect('mongodb://localhost:27017/PostAppDb')
.then(() => console.log('Connected to Database.'))
.catch(() => console.log('Error occoured while connecting to database!'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.get('/', (req, res) => {
    res.sendFile(HTML_FILE)
});

app.use("/api/posts", postRoutes);

module.exports = app;