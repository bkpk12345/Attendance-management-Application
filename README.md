# Attendance-management-Application


day #1

I haven't included package folder so you can install by typing npm install

it is a mvc structured app.

folder #1 controllers
  routing of pages and control structure of app
  
folder #2 models
  database configuration files
  eg connecting database
  schemas, models in mongodb etc
 
 folder #3 views
  application interface or template engine
  used ejs as template engine 
  
app.js main entry point

package.json necessary packages for the app

steps t start working 
1 type npm install all packages 

2 after installing all packages, start mongodb server i've used local mongodb instance

3 after installing all packages and starting mongodb server

4 start app by typing 
  node app.js
5 you are running at port at 9000
 try these apis
  http://localhost:9000/signup
  http://localhost:9000/user
  http://localhost:9000/superuser
  http://localhost:9000/login
  
  before that there will not be any data on mongodb server so to add little data
  run this script node models/signin.js
  before running node app.js
  
  
  
  ***************day 2***********
  login authentication
  
  i have used express-session package to login authetication
  
  to test app
  step 1) first add some users to database to add users to mongodb edt this file if you want  file--  /models/signin.js
    enter different users to signin.js file
    to add these users simply    type node model/signin.js
    add single admin as super user with same above step 
  step 2)  install all necessary packages by typing npm install
  
  step 3) to test app run   npm app.js 
    enter email and password that you have entered using step 1 and log in 
    data will be displayed accordingly.
    
    
    
********************************Day 3************************************
you can edit your information at user page by clicking on the pencil icon at right

once you log in at same time your login timestamp is recorded and total no of logins is calculated of the day by 
particular  user
No of lates and total no of attendance yet to calculate
