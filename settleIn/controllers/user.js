const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
router.use(express.static(path.join(__dirname, 'public')));
const user = require('../models/db');





//routes 

//login here
router.get('/login', function(req, res){
    res.render('login');
});

router.post('/login', function(req, res){
    res.redirect('user');
})


//employee dashboard
router.get('/user', function(req, res){
    user.findOne({firstname:"Balkrushna", password:"password"}).then(function(result){
        res.render('usersDash', {data: result});
        
    })
    
});

//superuser dashboard
router.get('/superuser', function(req, res){
    user.find().then(function(result){
        res.render('superUserDash', {data: result});
    })
    
});


//update information here
router.get('/update', function(req, res){
    res.render('edit')
})

router.post('/update', function(req, res){
    var id = "5c18a48bd8f9d202e2cf1c25";
    user.findByIdAndUpdate( id , req.body, (err, doc) => {
        // if (!err) { res.redirect('usersDash'); }
        // else {
        //         res.render("edit",{data: req.body});
        //     }
        console.log("some texr"+doc);    
    
    });

})


module.exports = router;


