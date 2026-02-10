import mongoose from "mongoose"

const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 10000,
            retryWrites: true,
            maxPoolSize: 10,
            minPoolSize: 5,
            family: 4
        })
        console.log("Database Connected")
    } catch (error) {
        console.error("Database Connection Error:", error.message)
        console.log("Retrying connection in 5 seconds...")
        setTimeout(() => connectDb(), 5000)
    }
}

export default connectDb