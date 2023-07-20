require('dotenv').config();
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger') // logger middleware
const errorHandler = require('./middleware/errorHandler') //error handler middleware
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const PORT = process.env.PORT || 4000

console.log(process.env.NODE_ENV)

//Connect to MongoDB

connectDB()

//Middleware to log events to a file on the server
app.use(logger);

//Middleware to process json
app.use(express.json());

//Middleward to parse cookies
app.use(cookieParser());

//Middleware to process cors requests
app.use(cors(corsOptions));

//Built in middleware - to server static files
app.use('/', express.static(path.join(__dirname, 'views')))

// Route to serve files in the server root directory ('views')
app.use('/', require('./routes/root'))

// User Routes
app.use('/users', require('./routes/userRoutes'))

//Note Routes

app.use('/notes', require('./routes/noteRoutes'))

//Test Note Route
app.use('/notes1', require('./routes/note1Routes'))

// Catch all for all routes to point to a 404 page
app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepted('json')) {
        res.json({message: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
} )

//error handler middleward to catch and log errors
app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log('Server started on port', PORT))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,'mongoErrLog.log')
})

