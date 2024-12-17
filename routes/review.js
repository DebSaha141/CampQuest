const express = require('express');
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Campground = require("../models/campground");
const { reviewsSchema } = require("../schemas");
const router = express.Router({mergeParams:true});
const Review = require("../models/review");

const validateReview = (req, res, next) => {
    const { error } = reviewsSchema.validate(req.body);
    if (error) {
      const msg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(msg, 400);
    } else {
      next();
    }
};
  
router.post("/", validateReview, catchAsync(async (req, res) => { 
    const {id}=req.params;
    const campground=await Campground.findById(id);
    const newReview = new Review(req.body.review);
    campground.reviews.push(newReview);
    await newReview.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  }));
  
router.delete('/:reviewId', catchAsync(async (req, res) => { 
    const {id,reviewId}=req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews:reviewId} });
    await Review.findByIdAndDelet(reviewId);  
    res.redirect(`/campgrounds/${id}`);
}));
  
module.exports = router;