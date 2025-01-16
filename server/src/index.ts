import express from "express"
import dotevn from "dotenv"
import userRoutes from "./routes/userRoutes";
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser";
import { createServer } from "http";
import path from "path";

// Calculate the correct public path - going up one level from the compiled directory
const publicPath = path.join(__dirname, '..', 'public');
dotevn.config()

const app = express()
const server = createServer(app)

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(publicPath));
app.use(cors({
    origin: process.env.CLIENT_URL as string,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
})
)

app.options("*", cors());


app.use("/auth", userRoutes)

mongoose.connect(
    "mongodb+srv://ashikms1998:vu9cDHgWuQ0LIBo4@cluster0.hrube.mongodb.net/blog-cluster?retryWrites=true&w=majority&appName=blog-application"
)
    .then(() => console.log("connected to MongoDB"))
    .catch((error) => console.log("Failed to connect to MongoDB", error))

server.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}...`)
})

