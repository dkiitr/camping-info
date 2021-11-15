const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("MONGO DATABASE OPEN!!")
    })
    .catch(err => {
        console.log("MONGO CONNECTION EROOR!!")
        console.log(err)
    })


const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '618e7ff4a33a30d87ad098f1',
            location: `${cities[random1000].city},  ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price,
            geometry: { type: 'Point', coordinates: [ 
                cities[random1000].longitude,
                cities[random1000].latitude
             ] },
            images: [
                {
                    url: 'https://res.cloudinary.com/darkinvader007/image/upload/v1636812525/YelpCamp/xsqgneznabrlvosnjrkq.jpg',
                    filename: 'YelpCamp/xsqgneznabrlvosnjrkq'
                },
                {
                    url: 'https://res.cloudinary.com/darkinvader007/image/upload/v1636812531/YelpCamp/pbnwrsjdmkt3lcnasems.jpg',
                    filename: 'YelpCamp/pbnwrsjdmkt3lcnasems'
                },
                {
                    url: 'https://res.cloudinary.com/darkinvader007/image/upload/v1636812532/YelpCamp/jb3nzk329lanf2joh3op.jpg',
                    filename: 'YelpCamp/jb3nzk329lanf2joh3op'
                }
            ]

        })
        await camp.save();
    }

}


seedDB().then(() => {
    mongoose.connection.close();
})