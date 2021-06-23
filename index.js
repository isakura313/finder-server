const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
require('dotenv').config();

const app = express();
// app.use(cors());
const PORT = process.env.PORT || 5000;
const dbUrl = 'mongodb+srv://admin:admin000@offerlist.dfj5o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const path = require('path');


app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header('Access-Control-Allow-Methods', 'POST, DELETE, PUT');
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if ('OPTIONS' == req.method) {
     res.sendStatus(200);
  }
  else {
    next();
  }
});
app.use(express.json({extended: true}));
app.use('/api/requests', require('./routes/requests.route'));
app.use('/api/search', require('./routes/search.route'));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

async function start() {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true
    })
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  } catch (e) {
    console.error(e)
  }
}

start();
