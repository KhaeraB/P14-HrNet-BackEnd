const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
//connect to mongodb atlas
mongoose.connect(
    process.env.DATABASE_URI,
    { useNewUrlParser: true, useUnifiedTopology: true}, 

)