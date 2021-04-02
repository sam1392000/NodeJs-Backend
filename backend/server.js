const express = require('express');
const app = express();
require('dotenv').config();
const apiroute = require('./routes/apiroutes');
const mongoose = require('mongoose');


// database connection
 
const db = process.env.DB;

mongoose.connect(db,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Databases Connected");
}).catch(() => {
    console.log("error in connection");
})


// middleware
app.use(express.json());
app.use('/learn',apiroute);


const port = process.env.PORT || 5000;
app.listen(port,() => {
    console.log(`Server running on the port ${port}`)
});