const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const databaseUrl =
  process.env.DATABASE_URI|| 'mongodb://localhost/hrnet'

mongoose.set('strictQuery', true)
//connect to mongodb atlas
mongoose.connect(
    databaseUrl,
    { useNewUrlParser: true, useUnifiedTopology: true}, 

)
