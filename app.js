var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json())

app.get('/getHelloWorld', function (req, res) {
    res.send('Hello World')
});

app.post('/SignUp', function (req,res) {
    console.log(req.body);
})


app.post('/SignIn', function (req,res) {
    console.log(req.body);
})

app.listen(8000);
console.log("server running on port 8000");