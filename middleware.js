const Campground = require("./models/campground");
const { campgroundSchema, reviewsSchema } = require("./schemas");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
    // console.log("REQ.USER...", req.user);
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be signed in!");
        return res.redirect("/login");
    }
    next();
};

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}


module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
      const msg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(msg, 400);
    } else {
      next();
    }
    // console.log(result);
  };  

module.exports.isAuthor = async (req, res, next) => { 
  const {id}=req.params; 
  const gotCampground = await Campground.findById(id);
  if (!gotCampground) {
    req.flash("error", "Cannot Find Your Campground");
    return res.redirect("/campgrounds");
  }
  if (!gotCampground.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => { 
    const {id, reviewId}=req.params; 
    const gotReview = await Review.findById(reviewId);
    // if (!gotReview) {
    //   req.flash("error", "Cannot Find Your Review");
    //   return res.redirect("/campgrounds");
    // }
    if (!gotReview.author.equals(req.user._id)) {
      req.flash("error", "You do not have permission to do that!");
      return res.redirect(`/campgrounds/${id}`);
    }
    next();
  };


module.exports.validateReview = (req, res, next) => {
    const { error } = reviewsSchema.validate(req.body);
    if (error) {
      const msg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(msg, 400);
    } else {
      next();
    }
};
