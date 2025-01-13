"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = require("http");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/auth", userRoutes_1.default);
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"],
    credentials: true,
}));
mongoose_1.default.connect("mongodb+srv://ashikms1998:vu9cDHgWuQ0LIBo4@cluster0.hrube.mongodb.net/blog-cluster?retryWrites=true&w=majority&appName=blog-application")
    .then(() => console.log("connected to MongoDB"))
    .catch((error) => console.log("Failed to connect to MongoDB", error));
server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}...`);
});
