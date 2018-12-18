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
