// server.js

// BASE SETUP
// =============================================================================

// call the packages we need 
var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");
var Bear       = require("./app/models/bear");

mongoose.connect("mongodb://localhost/restful-api");

// config app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API 
// =============================================================================
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next){
    console.log("Something is happen");
    next();
});

// test route to make sure everything is working
router.get("/", function(req, res){
   res.json({ message: "welcome to our api!" });
});

// more routes for our api will happen here

// REGISTER OUR ROUTES
// all of our routes will be prefixed with /api
app.use("/api", router);

// START THE SERVER
// =============================================================================
app.listen(port, process.env.IP, function(){
   console.log("Magic happens on port " + port);
});

