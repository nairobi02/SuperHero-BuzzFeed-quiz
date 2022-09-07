var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var ejs = require('ejs');
//var mongodb = require('mongodb');
var mongoose = require("mongoose");
var app = express();

app.set('view engine', 'ejs');

var dbConn =mongoose.connect('mongodb+srv://advaith17:mongoisgood@cluster0.a95ve6r.mongodb.net/test',{ useNewUrlParser: true , useUnifiedTopology : true});

const superSchema = { 
    Name: String,
    Superhero: String
}

const Superhero = mongoose.model("Superhero",superSchema)

app.use(bodyParser.urlencoded( { extended : false }));
app.use(express.static(path.resolve(__dirname,'public')));

app.post('/',function(req,res){
    let newObj = new Superhero({
        Name: req.body.Name,
        Superhero: req.body.Superhero
    });
    newObj.save();
    res.redirect("/");
    /* dbConn.then(function(db){
        delete req.body._id; // for safety reasons
        db.collection('Predictions').insertOne(req.body);
    });
    res.send('Data received:\n' + JSON.stringify(req.body));; */
})
app.get('/',  function(req, res) {
    res.sendFile(__dirname + "\\index.html");
   /*  dbConn.then(function(db) {
        db.collection('feedbacks').find({}).toArray().then(function(feedbacks) {
            res.status(200).json(feedbacks);
        });
    }); */
});

app.listen(3000,function(){
    console.log("Server is live");
})