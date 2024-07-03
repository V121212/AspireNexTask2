const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://vverma7271:k612QDmXl7wZ6eVH@cluster0.kbooxoe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=>{
        console.log('connected to mongo Successfully')
    })
}

module.exports = connectToMongo;