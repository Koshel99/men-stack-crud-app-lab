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

// show specific dog
app.get('/dogs/:dogId', async (req, res) => {
    const dogId = req.params.dogId;
    const dog = await Dog.findById(dogId);
    res.render('dogs/show.ejs', { dog: dog });
});

// update dog info
  
app.put('/dogs/:dogId', async (req, res) => {
    if (req.body.isAdopted === 'on') {
      req.body.isAdopted = true;
    } else {
      req.body.isAdopted = false;
    }
  
    const dogId = req.params.dogId;
    await Dog.findByIdAndUpdate(dogId, req.body);
    res.redirect(`/dogs/${dogId}`);
});

// edit a specific dog's page
app.get('/dogs/:dogId/edit', async (req, res) => {
    const dogId = req.params.dogId;
    const dog = await Dog.findById(dogId);
    res.render('dogs/edit.ejs', { dog: dog });
});
  

// delete a dog
app.delete('/dogs/:dogId', async (req, res) => {
    const dogId = req.params.dogId;
    await Dog.findByIdAndDelete(dogId);
    res.redirect('/dogs');
});
  
// list all dogs
app.get('/dogs', async (req, res) => {
    const allDogs = await Dog.find();
    res.render('dogs/index.ejs', { dogs: allDogs });
});
  
// add a new dog
app.post('/dogs', async (req, res) => {
    if (req.body.isAdopted === 'on') {
        req.body.isAdopted = true;
    } else {
        req.body.isAdopted = false;
    }
    await Dog.create(req.body);
    res.redirect('/dogs');
});
  

app.listen(3000, () => {
    console.log('Listening on port 3000');
});