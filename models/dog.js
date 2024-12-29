const mongoose = require('mongoose')


const dogSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: String,
})

const Dog = mongoose.model('Dog', dogSchema)
module.exports = Dog;
