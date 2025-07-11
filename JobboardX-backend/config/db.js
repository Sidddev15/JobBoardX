// Step4: MongoDB connection

const mongoose = require('mongoose');

const connectDB =  async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch(err) {
        console.log("MongoDB Error: Error connecting to the database", err.message);
        process.exit(1);
    }
}

module.exports = connectDB;