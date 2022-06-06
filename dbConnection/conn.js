const mongoose = require('mongoose');
const dotenv = require('dotenv')


mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connection with database is done');
}).catch((err) => {
    console.log(`error in conn.js : ${err}`);
})