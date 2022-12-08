require('dotenv').config()
const express = require('express')

const app = express()
const path = require('path')
const {logger, logEvents} = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')
const cookieParser = require('cookie-parser')
// const corsOptions = require('./config/corsOptions')

const connectDB = require('./config/dbConnect')

const PORT = process.env.PORT || 3001

 console.log(process.env.NODE_ENV)

//  "origin": "*",
//   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//   "preflightContinue": false,
//   "optionsSuccessStatus": 204
 app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE,');
    next();
  });

app.use(logger)

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))
app.use('/employees', require('./routes/employeesRoutes'))
app.all('*', (req, res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }else if (req.accepts('json')){
        res.json({message : '404 Not Found'})
    }else{
        res.type('text').send('404 Not Found')
    }
})

app.use(errorHandler)

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))




