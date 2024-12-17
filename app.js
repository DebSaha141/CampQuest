const express = require("express");
const app = express();
const path = require("path");
const catchAsync = require("./utils/catchAsync");
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressError");
const Campground = require("./models/campground");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const { campgroundSchema,reviewsSchema } = require("./schemas");
const Review = require("./models/review");

const campgrounds = require("./routes/campgrounds");
const reviews=require("./routes/review");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));

app.use("/campgrounds", campgrounds);
app.use("/campgrounds/:id/reviews",reviews);


app.get("/", (req, res) => {
  res.render("home.ejs");
});


app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  if (!err.message) err.message = "Oh No, Something went wrong";
  res.status(statusCode).render("errors", { err });
});

app.listen(3000, () => {
  console.log("Listening on PORT 3000");
});