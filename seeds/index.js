const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// Use this to help generate random positions in the array
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62c069045dd8933d723ddb59',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'A few clumsy towers in the Ginger Bread Man briskly ate a couple dazzling princes. The fast princess rather goes a couple wonderful Dumbos. Dumbos of the horses happily showed a Cinderella. Those Rapunzels wishfully eat a witty Rapunzel. A beautiful Fairy God Mother never saw a curse. A Snow White happily sees princesses. Some fast fairies really cook those delightful towers.',
            price: price,
            images: [
                {
                  url: 'https://res.cloudinary.com/dqfemxdwd/image/upload/v1657803413/YelpCamp/sahxtv50mlr2wcmyceio.jpg',
                  filename: 'YelpCamp/sahxtv50mlr2wcmyceio'
                },
                {
                  url: 'https://res.cloudinary.com/dqfemxdwd/image/upload/v1657803415/YelpCamp/a4xskgpfr4wf0lftkjqx.jpg',
                  filename: 'YelpCamp/a4xskgpfr4wf0lftkjqx'
                },
                {
                  url: 'https://res.cloudinary.com/dqfemxdwd/image/upload/v1657803416/YelpCamp/nfkijwu80envypgdjjap.jpg',
                  filename: 'YelpCamp/nfkijwu80envypgdjjap'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    console.log('Database seeded');
    mongoose.connection.close();
})