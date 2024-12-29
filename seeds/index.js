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
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20)+10;
    const newCampground = new Campground({
      author:'67651e301c57ed8e154c63e3',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: 'Point',
        coordinates: [cities[random1000].longitude, cities[random1000].latitude]
      },
      image: [
        {
          url: 'https://res.cloudinary.com/dzabseimd/image/upload/v1735286186/CampQuest/txqoo4yo59y8e8kb0ezt.jpg',
          filename: 'CampQuest/txqoo4yo59y8e8kb0ezt',
        },
        {
          url: 'https://res.cloudinary.com/dzabseimd/image/upload/v1735286187/CampQuest/vpfzt8vueqcsunykaos8.jpg',
          filename: 'CampQuest/vpfzt8vueqcsunykaos8',
        },
        {
          url: 'https://res.cloudinary.com/dzabseimd/image/upload/v1735286187/CampQuest/rtebhhnwuzfpftuu7zla.jpg',
          filename: 'CampQuest/rtebhhnwuzfpftuu7zla',
        }
      ],
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo sint adipisci ipsam aliquid reprehenderit, natus culpa obcaecati dicta facilis animi voluptates debitis nesciunt vero. Veniam molestiae impedit aut ducimus corporis. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam optio tenetur neque consectetur aspernatur labore, soluta voluptas, quo placeat natus ipsum explicabo architecto recusandae nihil ullam laboriosam omnis debitis unde.",
      price
    });
    await newCampground.save();
  }
};

seedDB().then(() => {
    mongoose.connection.close();
});
