const mongoose = require('mongoose');
const settleIn = require('./db');


const setle = new settleIn({
   firstname: "admin",
   lastname: "admin",
   password:"admin",
   email: "admin@admin.com",
   phone: 123456789,
   dob: 17/12/2018,
   attendance:[
       {date:Date.now()},
       {entry: Date.now()},
       {exit: Date.now()}
    ]
})

setle.save().then(function(err, result){
    if(err) { console.error(err) }
    else { console.log(result) }
}).catch(function(err){
    console.log(err);
});

