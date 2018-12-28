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
    req.session.date = new Date()
    
    //redirect to admin or normal user based on credentials
    if(req.session.eml === 'admin@admin.com' && req.session.pwd === 'admin'){
        res.redirect('superuser')
    }
    else{
        res.redirect('user'); }
})


//employee dashboard
router.get('/user', function(req, res){

   
    const mydate = {
        entry: req.session.date
    };
    
//check late or Not
    let lateOrNot = lateCheck(req.session.date)
    const myLate = {
        late: lateOrNot
    }
// console.log(mydate)

    result.findOne({email: req.session.eml, password:req.session.pwd})
    .then(function(result){

        if(result){
            // console.log("sesssion date: "+new Date(req.session.date).toDateString())
            // console.log("result date: "+new Date(result.attendance[result.attendance.length-2].entry).toDateString())
            result.attendance.reverse;
            // result.attendance.reverse;
            // console.log("*** "+ result.attendance[result.attendance.length - 1].toString()+"***")
            // console.log(req.session.date.toString())
            if(!result.attendance || result.attendance.length === 0){
                result.attendance.push(mydate,myLate)
                result.save()
                // console.log("in if")
            }
            else if(new Date(result.attendance[result.attendance.length-2].entry).toDateString() != new Date(req.session.date).toDateString()){
                // result.attendance.reverse;
                result.attendance.push(mydate,myLate)
                // result.attendance.push(mydate)

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
    if(!req.session.eml && !req.session.pwd){
        res.status(400).send('Login First to change details')
    }
    else{
    res.render('edit')}
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


var lateCheck = function(late){
    // console.log("Here late or not: "+late)
    
    if(new Date(late).getHours() <= 10 && new Date(late).getHours() <= 30)
    {return false;}
    else {return true;}
}
