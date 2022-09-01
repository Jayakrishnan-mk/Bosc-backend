const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
require('dotenv').config();

const connectDB = require('./server/Database/connection');
const port = process.env.PORT;

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

//log requests....................
app.use(morgan('tiny'));
app.use(express.json());

//mongodb connection...............
connectDB();

//parse json bodies...............
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes..........................
app.use('/album', require('./server/routes/albumRouter'));
app.use('/user', require('./server/Routes/userRouter'));


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

app.listen(port, () => {
    console.log('Connected to backend => ' + port);
});

