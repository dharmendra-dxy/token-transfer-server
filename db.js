const mongoose = require("mongoose");

async function connectMongo(){
    return mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log('Database has been connected succesfully'))
    .catch((e)=> console.log('Database error: ', e));
}

module.exports = {
    connectMongo,
}