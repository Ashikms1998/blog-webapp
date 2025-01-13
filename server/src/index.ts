import express from "express"
import dotevn from "dotenv"
import userRoutes from "./routes/userRoutes";
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser";
import { createServer } from "http";

dotevn.config()

const app = express()
const server = createServer(app)
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
})
)

app.use("/auth", userRoutes)

mongoose.connect(
    "mongodb+srv://ashikms1998:vu9cDHgWuQ0LIBo4@cluster0.hrube.mongodb.net/blog-cluster?retryWrites=true&w=majority&appName=blog-application"
)
    .then(() => console.log("connected to MongoDB"))
    .catch((error) => console.log("Failed to connect to MongoDB", error))

server.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}...`)
})

