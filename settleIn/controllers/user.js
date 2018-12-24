const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path');
router.use(express.static(path.join(__dirname, 'public')));
const result = require('../models/db');


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
    var today = new Date().toDateString();
    req.session.date = today;
    //redirect to admin or normal user based on credentials
    if(req.session.eml === 'admin@admin.com' && req.session.pwd === 'admin'){
        res.redirect('superuser')
    }
    else{    
        res.redirect('user'); }
})


//employee dashboard
router.get('/user', function(req, res){

    let lateOrNot = lateCheck(new Date(dte))
    
    var dte = req.session.date;
    const mydate = {
        entry: new Date(dte)
    };
    
    const myLate = {
        late: lateOrNot 
    }
    

    result.findOne({email: req.session.eml, password:req.session.pwd})
    .then(function(result){
        
        if(result){
        //     // console.log(result.attendance);
        //     const lastCheckIn = result.attendance[result.attendance.length -1];
        //     const lastCheckInTimestamp = lastCheckIn.date.getTime();
        //     console.log(lastCheckIn+"\n"+lastCheckInTimestamp)
        //     result.attendance.reverse();
        //     if (Date.now() > lastCheckInTimestamp + 100) {
        //         result.attendance.push(mydate);
        //         result.save();
        //     }    
                
        
        if(result.attendance && result.attendance.length > 0){
            const lastCheckIn = result.attendance[result.attendance.length - 1];
            const lastCheckInTimestamp = lastCheckIn.date//.getTime();

            if (Date.now() > lastCheckInTimestamp ) {
                result.attendance.push(mydate);
                if(lateOrNot === false){result.attendance.push(myLate);}

                result.save();
                }
            }
            
            // else{
            //     result.attendance.push(mydate);
            //     result.save();
            // }
        
        
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


var lateCheck = function(late){
    if(late.getHours() === 10 && late.getMinutes() >= 30)
    {return false;}
    else {return true;}
}