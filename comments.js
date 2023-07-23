// create web server
const express = require('express');
const app = express();

// import body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// import mongoose
const mongoose = require('mongoose');

// import models
require('./models/Comment');
const Comment = mongoose.model('comments');

// import routes
const commentsRoutes = require('./routes/commentsRoutes');
app.use(commentsRoutes);

// connect to db
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to comments database");
});

// listen to port 3003
app.listen(3003, () => {
    console.log('listening to port 3003');
});
```
routes/commentsRoutes.js
```
// Path: commentsRoutes.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = mongoose.model('comments');

// get all comments
router.get('/comments', async (req, res) => {
    const comments = await Comment.find();
    res.send(comments);
});

// get a comment
router.get('/comments/:id', async (req, res) => {
    const comment = await Comment.findOne({ _id: req.params.id });
    res.send(comment);
});

// add a comment
router.post('/comments', async (req, res) => {
    const comment = new Comment({


