const mongoose = require('mongoose');

// const mongoURI = "mongodb://localhost:27017/inotebook"; 
const mongoURI = process.env.DB_URL; 

const connectToMongo = async () => {
    console.log(mongoURI);
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToMongo;
