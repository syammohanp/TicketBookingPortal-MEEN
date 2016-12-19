const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const environment = require('./configs/environment');

//Get routes
const seatRoutes = require("./routes/seats");
const userRoutes = require("./routes/users");
const settingRoutes = require("./routes/settings");

//Configuration for getting data from Body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

//Welcome response when routing to /api
app.get("/api", (req, res) => {
    res.send("<h3>Welcome to Ticket Booking Portal API....</h3>");
});

const router = express.Router();

//Middle-ware using routes
app.use("/api/seats", seatRoutes);
app.use("/api/users", userRoutes);
app.use("/api/settings", settingRoutes);

//Connect to mongodb
// mongoose.connect("mongodb://127.0.0.1:27017/ticketbooking_dev");
mongoose.connect("mongodb://ticketbooking:ticketbooking@ds046549.mlab.com:46549/ticketbooking_dev");

//Get DB connection from mongoose js
const dbConnection = mongoose.connection;

//DB error connection handler
dbConnection.on('error', console.error.bind(console, 'Connection Error!'));

//DB connect successfull handler
dbConnection.once('open', () => {
    console.log('Ticket Booking Portal API connects database successfully');
});

//Listen from server
app.listen(environment.local.port, () => {
    console.log(`Ticket Booking Portal API is running on port ${environment.local.port}`);
});
