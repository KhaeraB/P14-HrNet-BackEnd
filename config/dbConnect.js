const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
//connect to mongodb atlas
mongoose.connect(
    process.env.DATABASE_URI,
    { useNewUrlParser: true, useUnifiedTopology: true}, 
    (err)=> {
        if(!err) console.log("Connected to MongoDB");
        else console.log("Fail to connect to MongoDB :" + err);
    }
)
