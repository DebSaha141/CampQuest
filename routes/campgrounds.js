const express = require('express');
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Campground = require("../models/campground");
const { campgroundSchema} = require("../schemas");
const router = express.Router();


const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
      const msg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(msg, 400);
    } else {
      next();
    }
    // console.log(result);
  };  


router.get(
    "/",
    catchAsync(async (req, res) => {
      const campgrounds = await Campground.find({});
      res.render("campgrounds/index", { campgrounds });
    })
  );
  
router.get(
    "/new",
    catchAsync(async (req, res) => {
      res.render("campgrounds/new");
    })
  );
  
router.post(
    "/",
    validateCampground,
    catchAsync(async (req, res, next) => {
      // if (!req.body.campground) throw new ExpressError("Invalid Campground",400);
      const data = req.body.campground;
      const campground = new Campground(data);
      await campground.save();
      res.redirect(`/campgrounds/${campground.id}`);
    })
  );
  
router.get(
    "/:id",
    catchAsync(async (req, res) => {
      const { id } = req.params;
      const campground = await Campground.findById(id).populate('reviews');
      res.render("campgrounds/show", { campground });
    })
  );
  
router.get(
    "/:id/edit",
    catchAsync(async (req, res) => {
      const { id } = req.params;
      const campground = await Campground.findById(id);
      res.render("campgrounds/edit", { campground });
    })
  );
  
router.put(
    "/:id",
    validateCampground,
    catchAsync(async (req, res) => {
      const { id } = req.params;
      const { campground } = req.body;
      console.log(campground, id);
      const updateCampground = await Campground.findByIdAndUpdate(
        id,
        campground,
        { runValidators: true }
      );
      res.redirect(`/campgrounds/${updateCampground.id}`);
    })
  );router.delete(
    "/:id",
    catchAsync(async (req, res) => {
      const { id } = req.params;
      await Campground.findByIdAndDelete(id);
      res.redirect("/campgrounds");
    })
);
  
module.exports = router;