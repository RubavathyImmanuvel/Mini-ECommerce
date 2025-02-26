//setup
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors') //to fix cors error
const connectDatabase = require('./config/connectDataBase')
dotenv.config({path: path.join(__dirname, 'config', 'config.env')})

const products = require('./routes/product');
const orders = require('./routes/order');

connectDatabase();

app.use(express.json()); //puts req json into body
app.use(cors()) //to add header in response(Access-Control-Allow-Origin)

app.use('/api/v1/', products);
app.use('/api/v1/', orders);

// app.listen(8000, () => {
app.listen(process.env.PORT, () => {
    console.log(`server listening to port ${process.env.PORT} in ${process.env.NODE_ENV}`)
});