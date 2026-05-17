import mongoose from 'mongoose';

const connectDB = async ()=>{
    try {
        mongoose.connection.on('connected',()=>{
            console.log("MongoDB connected")
        })
        await mongoose.connect(`${process.env.MONGODB_URL}/connectfy`)
        console.log("MongoDB connected")
    } catch (e) {
        console.error("Error connecting to MongoDB:", e)
    }
}

export default connectDB