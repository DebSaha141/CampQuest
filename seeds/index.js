const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities.js");
const { places, descriptors } = require("./seedHelpers.js");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20)+10;
    const newCampground = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: `https://picsum.photos/400?random=${Math.random()}`,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo sint adipisci ipsam aliquid reprehenderit, natus culpa obcaecati dicta facilis animi voluptates debitis nesciunt vero. Veniam molestiae impedit aut ducimus corporis. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam optio tenetur neque consectetur aspernatur labore, soluta voluptas, quo placeat natus ipsum explicabo architecto recusandae nihil ullam laboriosam omnis debitis unde.",
      price
    });
    await newCampground.save();
  }
};

seedDB().then(() => {
    mongoose.connection.close();
});
