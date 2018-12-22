const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path');
router.use(express.static(path.join(__dirname, 'public')));
const user = require('../models/db');


//routes here
router.get('/', function(req, res){
    res.render('home');
})


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
    else{    
        res.redirect('user'); }
})


//employee dashboard
router.get('/user', function(req, res){
    const mydata = {
        entry: Date.now()
      };
    user.findOne({email: req.session.eml, password:req.session.pwd}).then(function(result){
        if(result){
            result.attendance.push(mydata)
            result.save()
            res.render('usersDash', {data: result});}
        else{res.status(400).send('Enter correct credentials')}
        })
    .catch(function(err){
        console.log(err)
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
    user.findOneAndUpdate({email: req.session.eml, password: req.session.pwd} , req.body,function(result){
        res.status(200).redirect('login');
    })
    
    

})

router.get('/logout', function(req, res){
    req.session.destroy();
    res.status(400).redirect('login');
})


module.exports = router;


