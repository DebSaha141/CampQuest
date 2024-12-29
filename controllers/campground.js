const Campground = require("../models/campground");
const { cloudinary } = require("../cloudinary");
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
}

module.exports.renderNewForm=async (req, res) => {
    res.render("campgrounds/new");
}

module.exports.createCampground = async (req, res, next) => {
  // if (!req.body.campground) throw new ExpressError("Invalid Campground",400);
  const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
    const data = req.body.campground;
  const campground = new Campground(data);
  campground.geometry = geoData.features[0].geometry;
  campground.author = req.user._id;
  // console.log(req.files);
  campground.image = req.files.map(f => ({ url: f.path, filename: f.filename }));
  await campground.save();
  // console.log(campground);
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
  const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
  // console.log(campground, id);
  const imgs=req.files.map(f => ({ url: f.path, filename: f.filename }));
    const updateCampground = await Campground.findByIdAndUpdate(
      id,
      campground,
      { runValidators: true }
  );
  updateCampground.image.push(...imgs);
  updateCampground.geometry = geoData.features[0].geometry;
  await updateCampground.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await updateCampground.updateOne({ $pull: { image: { filename: { $in: req.body.deleteImages } } } });
  }
  // console.log(updateCampground);
    req.flash("success", "Successfully updated campground!");
    res.redirect(`/campgrounds/${updateCampground.id}`);
}

module.exports.deleteCampground=async (req, res) => {
    const { id } = req.params;
      await Campground.findByIdAndDelete(id);
      req.flash("success", "Successfully deleted campground");
    res.redirect("/campgrounds");
}
