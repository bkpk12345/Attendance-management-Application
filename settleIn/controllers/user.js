const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path');
router.use(express.static(path.join(__dirname, 'public')));
const result = require('../models/db');
const moment = require('moment');


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
    var today = new Date();
    req.session.date = today;

    console.log('1: '+ req.session.date)

    //redirect to admin or normal user based on credentials
    if(req.session.eml === 'admin@admin.com' && req.session.pwd === 'admin'){
        res.redirect('superuser')
    }
    else{
        res.redirect('user'); }
})


//employee dashboard
router.get('/user', function(req, res){

    // let lateOrNot = lateCheck(req.session.date)

    const mydate = {
        entry: new Date()
    };

    // const myLate = {
    //     late: lateOrNot
    // }


    result.findOne({email: req.session.eml, password:req.session.pwd})
    .then(function(result){

        if(result){
            // result.attendance.reverse;
            // console.log("*** "+ result.attendance[result.attendance.length - 1].toString()+"***")
            // console.log(req.session.date.toString())
            if(result.attendance.length === 0){
                result.attendance.push(mydate)
                result.save()
                // console.log("in if")
            }
            else if(result.attendance[result.attendance.length - 1].toString() < req.session.date.toString()){
                // result.attendance.reverse;

                result.attendance.push(req.session.date)
                result.save()
                // console.log("in if else: "+result.attendance[result.attendance.length - 1].toDate() +"\nnew date() "+Date())
            }



            res.render('usersDash', {data: result});


        }


        else{res.status(400).send('Enter correct credentials')}
        })

        .catch(function(err){
        console.log(err)
    })

});

//superuser dashboard
router.get('/superuser', function(req, res){
    if("admin@admin.com" === req.session.eml && 'admin' === req.session.pwd ){
        result.find().then(function(result){
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
    result.findOneAndUpdate({email: req.session.eml, password: req.session.pwd} , req.body,function(result){
        res.status(200).redirect('login');
    })



})

router.get('/logout', function(req, res){
    req.session.destroy();
    res.status(400).redirect('login');
})


module.exports = router;


// var lateCheck = function(late){
//     if(late.getHours() === 10 && late.getMinutes() >= 30)
//     {return false;}
//     else {return true;}
// }
