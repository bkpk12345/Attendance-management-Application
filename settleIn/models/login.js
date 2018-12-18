const mongoose = require('mongoose');
const settleIn = require('./db');


let name = "Balkrushna";
let pass = "12345";

settleIn.find({firstname: name, password: pass}, function(err, result){
    if(err) {console.error(err)}
    else {
        console.log(result);
    }
})
