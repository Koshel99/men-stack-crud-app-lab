const mongoose = require('mongoose')


const dogSchema = new mongoose.Schema({
    name: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    isAdopted: { type: Boolean, default: false }
})

const Dog = mongoose.model('Dog', dogSchema)
module.exports = Dog;
