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

// on routes that end in /bears
// -----------------------------------------------------------------------------
router.route("/bears")

    // create a bear (accessed at POST */api/bears)
    .post(function(req, res){
        
        var bear = new Bear();
        bear.name = req.body.name;
        
        // save the bear and check for errors
        bear.save(function(err){
            if(err){
                res.send(err);
            }
            res.json({ message: "Bear created!" });
        });
    })
    
    // get all the bears (accessed at GET */api/bears)
    .get(function(req, res){
        Bear.find(function(err, bears){
            if(err){
                res.send(err);
            }
            res.json(bears);
        });
    });
    
// on routes that end in /bears/:bear_id
// -----------------------------------------------------------------------------
router.route("/bears/:bear_id")

    // get the bear with its id (accessed at GET */api/bears/:bear_id)
    .get(function(req, res){
        Bear.findById(req.params.bear_id, function(err, bear){
            if(err){
                res.send(err);
            }
            res.json(bear);
        });
    })
    
    // update the bear with its id (accessed at PUT */api/bears/:bear_id)
    .put(function(req, res){
        Bear.findById(req.params.bear_id, function(err, bear){
            if(err){
                res.send(err);
            }
            
            bear.name = req.body.name; // update the bear info
            
            // save the bear
            bear.save(function(err){
                if(err){
                    res.send(err);
                }
                res.json({ message: 'Bear updated!' });
            });
        });
    })
    
    // delete the bear with its id (accessed at DELETE */api/bears/:bear_id)
    .delete(function(req, res){
        Bear.remove({
            _id : req.params.bear_id
        }, function(err){
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted' });
        });
    });

// REGISTER OUR ROUTES
// all of our routes will be prefixed with /api
app.use("/api", router);

// START THE SERVER
// =============================================================================
app.listen(port, process.env.IP, function(){
   console.log("Magic happens on port " + port);
});

