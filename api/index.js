import dotenv from 'dotenv';  // Import dotenv
import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth.js'
import hotelsRouter from './routes/hotels.js'
import usersRouter from './routes/users.js'
import roomsRouter from './routes/rooms.js'
import cookieParser from 'cookie-parser';
import cors from "cors"

dotenv.config();  // Call dotenv.config() immediately

const hostName = process.env.HOST_NAME;
const port = process.env.PORT || 8800;

const app = express();


// Middlewares
app.use(cookieParser())
app.use(express.json())
app.use(cors(
    {
        origin:["https://bookingapp-black.vercel.app"],
        methods:["POST", "GET"],
        credentials : true
    }
))

app.use("/api/hotels", hotelsRouter)
app.use("/api/rooms", roomsRouter)
app.use("/api/users", usersRouter)
app.use("/api/auth", authRouter)

app.use((err,req,res,next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Sonething Went wrong"
    return res.status(500).json({
        success : false,
        status : errorStatus,
        message :errorMessage,
        stack : err.stack
    })
})

const connect = async () => {
    try {
        console.log("MongoDB URL:", process.env.MONGO_DB_LOCAL_URL);  // Debug log
        await mongoose.connect(process.env.MONGO_DB_LOCAL_URL);  // Connect to MongoDB using the URL from .env
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected!");
});

app.get("/", (req, res) => {
    res.send("Hello World");
});



app.listen(port, hostName, () => {
    connect();
    console.log("Connected to Backend!!!");
});
