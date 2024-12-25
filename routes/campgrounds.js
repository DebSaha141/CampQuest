const express = require('express');
const catchAsync = require("../utils/catchAsync");
const campgroundController=require("../controllers/campground");
const router = express.Router();
const { isLoggedIn,validateCampground,isAuthor } = require("../middleware");


router.route('/').get(catchAsync(campgroundController.index)
).post(isLoggedIn,
  validateCampground,
  catchAsync(campgroundController.createCampground)
);
  
router.get(
  "/new", isLoggedIn, catchAsync(campgroundController.renderNewForm)
);

router.route('/:id').get(
  catchAsync(campgroundController.showCampgorund)
  ).put(
    isLoggedIn,isAuthor,
      validateCampground,
      catchAsync(campgroundController.updateCampground)
  ).delete(
    isLoggedIn,isAuthor,
      catchAsync(campgroundController.deleteCampground)
  );
  
router.get(
  "/:id/edit", isLoggedIn, isAuthor,
  catchAsync(campgroundController.editCamprgound)
);
  
module.exports = router;