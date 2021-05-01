var express = require('express'); // imports the express module
var app = express(); // creates an express application for routing
var fs = require("fs"); // file system module for communicating with our local file system

// define a new user for the post request
var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

// create a route definition for get requests endpoint listUsers where we read a file and
// send the file data to the client 
app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

// create a route definition for get requests endpoint id number
app.get('/:id', function (req, res) {
   // read the file and existing users
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      // parse the JSON string
      var users = JSON.parse( data );
      // check the file for specified user id and store in user 
      var user = users["user" + req.params.id] 
      // log requested data
      console.log( user );
      res.end( JSON.stringify(user));
   });
})

// create a route definition for post requests endpoint addUser
app.post('/addUser', function (req, res) {
   // read the file and existing users
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      // parse the JSON string
      data = JSON.parse( data );
      // check the file for user4, if it exists it will update the existing resource, if not it will
      // create a new resource
      data["user4"] = user["user4"];
      console.log( data );
      // covert the object to a JSON string
      res.end( JSON.stringify(data));
   });
})

var id = 2; // value redundant but will keep for tutorial sake

// create a route definition for delete requests endpoint deleteUser
app.delete('/deleteUser', function (req, res) {
   // read the file and existing users
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      // parse the JSON string
      data = JSON.parse( data );
      // check for user2 and delete the data if exists (for this example it always will)
      delete data["user" + 2];
      // log update data
      console.log( data );
      res.end( JSON.stringify(data));
   });
})

// start the server on port 8081 and log the server info to the console
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})