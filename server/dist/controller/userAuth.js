"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.userSignUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const user = yield User_1.User.findOne({ email });
    if (user) {
        return res.json({ message: "user already exist" });
    }
    const salt = 10;
    const hashPassword = yield bcrypt_1.default.hash(password, salt);
    const newUser = new User_1.User({
        username,
        email,
        password: hashPassword,
    });
    yield newUser.save();
    return res.json({ status: true, message: "user registration successfull" });
});
exports.userSignUp = userSignUp;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const secret = process.env.KEY;
    console.log(email, password, "getting here");
    const user = yield User_1.User.findOne({ email });
    console.log(user, "This is user details fetched at userLogin");
    if (!user) {
        return res.json({ message: "User not registered" });
    }
    const validPassword = yield bcrypt_1.default.compare(password, user.password);
    if (!validPassword) {
        return res.json({ message: "Password is incorrect" });
    }
    if (!secret) {
        throw new Error('Secret key is missing');
    }
    const token = jsonwebtoken_1.default.sign({ username: user.username, userid: user.id }, secret, {
        expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
    return res.json({
        status: true,
        message: "login successfully",
        userId: user.id,
    });
});
exports.userLogin = userLogin;
