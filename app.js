var express       = require("express");
var app           = express();
var bodyParser    = require("body-parser");
var mongoose      = require("mongoose");
var Campground    = require("./models/campground");
var seedDB        = require("./seeds");
var Comment       = require("./models/comment");
var passport      = require("passport");
var LocalStrategy = require("passport-local");
var flash = require("connect-flash");
var User          = require("./models/user");
var methodOverride = require("method-override");
var indexRoutes = require("./routes/index"),
commentRoutes = require("./routes/comments"),
campgroundRoutes  = require("./routes/campgrounds");

mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());



// seedDB();
// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Once again I win!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
   next();
});


app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);











app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});