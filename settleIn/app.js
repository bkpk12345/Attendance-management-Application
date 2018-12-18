const express = require('express');
const app = express()
const router = require('./controllers/user');
const path = require('path');
//template engine
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')));

//routes 
app.use('/', router);





const port = process.env.PORT || 9000;
app.listen(port, ()=>{
    console.log(`We are listening at ${port}`);
}); 