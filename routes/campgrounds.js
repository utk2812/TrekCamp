var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");




router.get("/campgrounds",function(req,res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
   else{
    res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser:req.user});
    }
       
        });
   });


router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id:     req.user._id,
        username:req.user.username
    };
  
    var newCampground = {name:name , image:image,description:desc, author:author};
    Campground.create(newCampground, function(err,newlyCreated){
        if(err){
            console.log(err);
        }
        else{
             
             res.redirect("/campgrounds");
        }
    });
   
});

// NEW FORM to submit new campgrounds
router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});

// SHOW more info
router.get("/campgrounds/:id",function(req, res){
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       }else{
         res.render("campgrounds/show",{campground:foundCampground});       
       }
   });
});




// Edit routes
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
 
  Campground.findById(req.params.id, function(err, foundCampground){
                res.render("campgrounds/edit", {campground: foundCampground});
  });
});
          




// UPDATE ROUTES
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req, res){
Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
          console.log(err);
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});


// DESTROY ROUTE

router.delete("/campgrounds/:id",function(req,res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
       }
       else{
           res.redirect("/campgrounds");
       }
   });
});

















// MIDDLEWARE


  
module.exports = router;


