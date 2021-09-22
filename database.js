const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// const URI = 'mongodb://localhost/mutual';
const URI = 'mongodb+srv://robjacobo:j7li8F@clustermutual-lwemx.mongodb.net/MutualDB?retryWrites=true&w=majority&authSource=admin';

    mongoose.connect(URI, { useNewUrlParser: true })
    .then(db => console.log('DB is connected!'))
    .catch(err => console.error(err))

module.exports = mongoose;