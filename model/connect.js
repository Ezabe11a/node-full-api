const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/2002', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('open', function () {
    console.log('server success');
})

db.on('error', function () {
    console.log('server fails');
})