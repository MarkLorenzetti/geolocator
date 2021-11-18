const mongoose = require('mongoose');
//const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const cities = require('cities.json');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 1000; i++) {
        const random1000 = Math.floor(Math.random() * cities.length);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6170484c611c0320e810dad2',
            location: `${cities[random1000].name}, ${cities[random1000].country}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                "type": "Point", 
                "coordinates": [
                    cities[random1000].lng,
                    cities[random1000].lat,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/marcoyelpcamp2021/image/upload/v1635782936/Yelpcamp/hld7hk1mshcb2nisw3eh.jpg',
                  filename: 'Yelpcamp/hld7hk1mshcb2nisw3eh',
                },
                {
                  url: 'https://res.cloudinary.com/marcoyelpcamp2021/image/upload/v1635782945/Yelpcamp/wa5saejvh0wdtt86hzis.jpg',
                  filename: 'Yelpcamp/wa5saejvh0wdtt86hzis',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})