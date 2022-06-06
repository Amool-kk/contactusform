const mongoose = require('mongoose');


const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    date: String
});

const appointmentDB = mongoose.model('data',formSchema);

module.exports = appointmentDB;