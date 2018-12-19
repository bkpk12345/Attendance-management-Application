const express = require('express');
const app = express()
const session = require('express-session');
const router = require('./controllers/user');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')


app.use(session( {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
} ))

//template engine
app.set('view engine', 'ejs')


//set express
app.use(express.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));
mongoose.Promise = global.Promise;


//routes 
app.use('/',urlencodedParser, router);





const port = process.env.PORT || 9000;
app.listen(port, ()=>{
    console.log(`We are listening at ${port}`);
}); 