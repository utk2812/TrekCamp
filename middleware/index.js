var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {}


middlewareObj.checkCampgroundOwnership = function(req,res,next){
   
  if(req.isAuthenticated()){
  Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
         console.log(err);
          res.redirect("back");
      } else {
           if(foundCampground.author.id.equals(req.user._id)){
              next();
           }else{
               req.flash("error","Access denied");
               res.redirect("back");
           }
          
       }
  });     
  } else {
      res.redirect("back");
  }
    
        }

middlewareObj.checkCommentOwnership = function(req,res,next){
   
  if(req.isAuthenticated()){
  Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
         console.log(err);
          res.redirect("back");
      } else {
           if(foundComment.author.id.equals(req.user._id)){
              next();
           }else{
               req.flash("error","You dont have permission");
               res.redirect("back");
           }
          
       }
  });     
  } else {
      res.redirect("back");
  }
    
        }
    
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please login");
    res.redirect("/login");
  }




module.exports = middlewareObj;