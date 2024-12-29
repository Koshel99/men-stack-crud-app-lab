require('dotenv').config();
require('./config/database');

const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');

//MODELS
const Dog = require("./models/dog.js");

const app = express();

//MIDDLEWARE
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

//ROUTES

//main page
app.get("/", async (req, res) => {
    res.render("index.ejs");
});

// to add a new dog page
app.get('/dogs/new', (req, res) => {
    res.render('dogs/new.ejs');
});

app.get('/dogs/:dogId', async (req, res) => {
    const dogId = req.params.dogId;
    const dog = await Dog.findById(dogId);
    res.render('dogs/show.ejs', { dog: dog });
});


app.listen(3000, () => {
    console.log('Listening on port 3000');
});