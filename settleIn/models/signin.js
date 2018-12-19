const mongoose = require('mongoose');
const settleIn = require('./db');


const setle = new settleIn({
   firstname: "Nitin",
   lastname: "Garavel",
   password:"password",
   email: "abc@abc.com",
   phone: 123456789,
   dob: 17/12/2018 
})

setle.save().then(function(err, result){
    if(err) { console.error(err) }
    else { console.log(result) }
}).catch(function(err){
    console.log(err);
});