var express = require('express')
var bodyParser = require('body-parser')
var mongoInstance;

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
var url = 'mongodb://192.168.43.195:27017/WiFiDB';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);

    mongoInstance=db;

    console.log("Connected correctly to server");

});


var app = express()
app.use(bodyParser.json())


app.get('/getHelloWorld', function (req, res) {
    res.send('Hello World')
});

app.post('/SignUp', function (req, res) {
    console.log(req.body);
    var user = req.body;
    validateUserNameOnSignIn(mongoInstance,user,function (response)
    {
        console.log(response);

        if(response.length==0)
        {
            insertUserToDb(mongoInstance,user,function (response) {

                var responseObj={
                    "status":"success",
                    "responseBody":response
                }
                res.send(responseObj);

            } );
        }
        else
        {
            var responseObj={
                "status":"success",
                "responseBody":"User already exist"
            }
            console.log("User already exist");
            res.send(responseObj);
        }
    });



})


app.post('/SignIn', function (req, res) {
    console.log(req.body);
})

app.listen(8000);
console.log("server running on port 8000");

function validateUserNameOnSignIn(db,user,callback)
{
  var query={"UserName":user.UserName};
    db.collection("users").find(query).toArray(function(err, result) {
        if (err) throw err;
        callback(result);
    });
};

var insertUserToDb = function (db,user, callback) {

    var usersCollections =db.createCollection("users");

    db.collection("users").insertOne(user, function(err, result) {

        console.log("Inserted user signup details in db");
        var output="SignUp done";
        callback(output);
    });


}
