const Campground = require("../models/campground");

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
}

module.exports.renderNewForm=async (req, res) => {
    res.render("campgrounds/new");
}

module.exports.createCampground = async (req, res, next) => {
    // if (!req.body.campground) throw new ExpressError("Invalid Campground",400);
    const data = req.body.campground;
    const campground = new Campground(data);
    campground.author = req.user._id;
      await campground.save();
      req.flash("success", "Successfully made a new campground!");
    res.redirect(`/campgrounds/${campground.id}`);
}

module.exports.showCampgorund=async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate({
      path: 'reviews',
      populate: {
        path:'author'
      }
    }).populate('author');
    // console.log(campground);
        if (!campground) {
            req.flash("error", "Cannot find that campground!");
            return res.redirect("/campgrounds");
        }
      res.render("campgrounds/show", { campground });
}
    
module.exports.editCamprgound=async (req, res) => {
    const { id } = req.params;
      const campground = await Campground.findById(id);
      if (!campground) {
          req.flash("error", "Cannot find that campground!");
          return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", { campground });
}

module.exports.updateCampground=async (req, res) => {
    const { id } = req.params;
    const { campground } = req.body;
    // console.log(campground, id);
    const updateCampground = await Campground.findByIdAndUpdate(
      id,
      campground,
      { runValidators: true }
      );
      req.flash("success", "Successfully updated campground!");
    res.redirect(`/campgrounds/${updateCampground.id}`);
}

module.exports.deleteCampground=async (req, res) => {
    const { id } = req.params;
      await Campground.findByIdAndDelete(id);
      req.flash("success", "Successfully deleted campground");
    res.redirect("/campgrounds");
}
