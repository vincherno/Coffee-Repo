// Setting up our dependencies
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
// passes information from the frontend to the backend
const bodyParser = require('body-parser')
// this is our middleware for talking to mongo db
const mongoose = require('mongoose');

// Schemas
// every schema needs a capital letter
const Coffee = require('./models/coffee.js')

// Start our dependencies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

// Start our server
app.listen(port, () => {
    console.log(cors)
    console.log(`Hello! Server is running on port ${port}`)
})

//let's connect mongo DB cloud
//Cluster name: myCluster
mongoose.connect(
    `mongodb+srv://vincherno:tnecniv123@mycluster.884mtcn.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
    //.then is a chaining method used with promises
).then(() => {
    console.log("You've connected to mongoDB")
    //.catch is a method to catch any errors which might happen in a promise
}).catch((err) => {
    console.log(`Database connection error${err.message}`)
})

//Set up a route/endpoint which will allow the frontend to communicate with the backend
//The purpose of app.post is to send something 
app.post('/addCoffee', (req, res) => {
    // create a new instance of the coffee schema
    const newCoffee = new Coffee({
        //give our new coffeee the details we sent from the frontend
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price,
        image_url: req.body.image_url
    });
    // to save the newCoffee to the database
    // use the variable declared above
    newCoffee.save()
        .then((result) => {
            console.log(`Added a new coffee successfully!`)
            //returns back to the frontend what just happened
            res.send(result)
        })
        // catch any errors
        .catch((err) => {
            console.log(`Error: ${err.message}`)
        })
})

app.get('/allCoffee', (req, res) => {
    Coffee.find()
        //.then is a method in which we can chain functions on
        //chaining means that once something has run, we can run another thing
        // the result variable is being returned by the .find() that we ran earlier
        .then(result => {
            //send back the result of the search to whoever asks for it
            //in other words, send back the result to the frontend
            res.send(result)
        })
})
