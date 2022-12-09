require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const app = express()
const path = require('path')
const {logger, logEvents} = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')

const cookieParser = require('cookie-parser')

const connectDB = require('./config/dbConnect')
const PORT = process.env.PORT || 3001
// console.log(process.env.NODE_ENV)


 app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE,');
    next();
  });

app.use(logger)

app.use(express.json())

app.use(cookieParser())

//home
app.get('/', (req, res) => {
    res.send("Hello World !!");
})

//endPoints
app.use("/", require("./routes/root"));
app.use("/api/employees", require("./routes/employeesRoutes"));

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})


