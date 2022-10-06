const express = require('express');
const app = express();
const router = express.Router();
const fs = require("fs");

let rawdata = fs.readFileSync('user.json');
let users = JSON.parse(rawdata);

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/

router.get('/', (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

router.get('/home', (req, res) => {
  res.send('This is home router');
});

/*
- Return all details from user.json file to client as JSON format
*/

router.get('/profile', (req, res) => {
  res.send(`${JSON.stringify(users)}

  <br><br><br><br>
<p>Enter Name and Password from the above object</p>
  <div style="width: 18rem;">
  <form action="/login" method="GET">
      <div class="form-group">
          <input type="text" class="form-control" id="name" name="name" placeholder="Full Name">
      </div>
      <div class="form-group">
          <input type="password" class="form-control" id="password" name="password" placeholder="Password">
      </div>
      <br>
    </form>
</div>

`);

});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req, res) => {
  // res.send('This is login router');
  var userName = req.query.name
  var userPassword = req.query.password
  var stts;
  var msg;

  if (users.name == userName && users.password == userPassword) {

    stts = true;
    msg = "User Is valid"
    console.log(stts)
    res.send(`${JSON.stringify(responseMessage(stts, msg))} 
             <br><br><br><br>
            <a href="/logout"><button type="button" class="btn btn-danger">Logout</button></a>
            <a href="/"><button type="button" class="btn btn-danger">Exit</button></a>`)

  } else if (users.name != userName || users.password == userPassword) {

    stts = false;
    msg = "User Name is invalid"
    res.send(`${JSON.stringify(responseMessage(stts, msg))} 
    <br><br><br><br>
   <a href="/profile"><button type="button" class="btn btn-danger">Back</button></a>
   <a href="/"><button type="button" class="btn btn-danger">Exit</button></a>`)

  } else if (users.name == userName || users.password != userPassword) {

    stts = false;
    msg = "Password is invalid"
    res.send(`${JSON.stringify(responseMessage(stts, msg))} 
    <br><br><br><br>
   <a href="/profile"><button type="button" class="btn btn-danger">Back</button></a>
   <a href="/"><button type="button" class="btn btn-danger">Exit</button></a>`)

  } else {
    res.send("Opps! Somethng went wrong")
  }

  function responseMessage(stts, msg) {
    return objMes = {
      status: stts,
      message: msg
    }
  }

});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout', (req, res) => {
  res.send(`<b>${users.name}<b> successfully logout

  <br> <br> <br>
  <a href="/profile"><button type="button" class="btn btn-danger">Ok</button></a>`

  );
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port ' + (process.env.port || 8081));