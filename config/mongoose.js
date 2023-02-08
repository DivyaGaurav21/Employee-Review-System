const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

mongoose.connect('mongodb+srv://divyagaurav:divyagaurav@cluster1.rj5rnxe.mongodb.net/?retryWrites=true&w=majority');
// mongoose.connect('mongodb://localhost/employee-review-system');

const db = mongoose.connection;

//if error then pritnt message
db.on('error', console.error.bind(console, 'error in connectin DB'));

// server is up then run a message 
db.once('open', () => {
    console.log('Succesfully !! Connected to the DataBase');
})
module.export = db;