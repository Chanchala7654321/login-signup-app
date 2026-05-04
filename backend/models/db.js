const mongoose = require('mongoose');


// variable
const mongo_url = process.env.MONGODB_URL;

mongoose.connect(mongo_url)
.then(()=>{
    console.log('mongodb connected.....');
}).catch((err) =>{
    console.log('mongoDB connection error', err);
    
})









