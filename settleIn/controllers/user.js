const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path');
router.use(express.static(path.join(__dirname, 'public')));
const user = require('../models/db');


//routes here

//login here
router.get('/login', function(req, res){
    res.render('login');
    
});

router.post('/login', function(req, res){
    req.session.eml = req.body.email;
    req.session.pwd = req.body.password;
    
    
    
    //redirect to admin or normal user based on credentials
    if(req.session.eml === 'admin@admin.com' && req.session.pwd === 'admin'){
        res.redirect('superuser')
    }
    else{ res.redirect('user'); }
})


//employee dashboard
router.get('/user', function(req, res){
    user.findOne({email: req.session.eml, password:req.session.pwd}).then(function(result){
            res.render('usersDash', {data: result});
        })
    
});

//superuser dashboard
router.get('/superuser', function(req, res){
    if("admin@admin.com" === req.session.eml && 'admin' === req.session.pwd ){
        user.find().then(function(result){
            res.render('superUserDash', {data: result});
        }) 
    }else{
    res.status(400).send('Enter correct credentials')}
    
});


//update information here
router.get('/update', function(req, res){
    res.render('edit')
})

router.post('/update', function(req, res){
    var id = "5c18a48bd8f9d202e2cf1c25";
    user.findByIdAndUpdate( id , req.body);
    res.redirect('/user')

})

router.get('/logout', function(req, res){
    req.session.destroy();
    res.redirect('login');
})


module.exports = router;


