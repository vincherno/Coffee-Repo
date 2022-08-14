//Here is our first schema
//Every schema needs the mongoose dependancy
const mongoose = require('mongoose')

//Set up the properties of our schema
const coffeeSchema = new mongoose.Schema(
    {
        // every schema requires an id
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        price: Number,
        image_url: String
    },
    {
        //versionKey can help us with updated schemas for larger projects
        versionKey: false,
    }
);

//set up an export telling this .js file to be sent to our main index.js
// First argument is the name of schema
// The name of the export is upto us, but should reflect the data (singular)
//The second argument is the schema variable we declared above
module.exports = mongoose.model('Coffee', coffeeSchema)