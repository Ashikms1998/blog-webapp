"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuth_1 = require("../controller/userAuth");
const router = express_1.default.Router();
router.post('/signup', userAuth_1.userSignUp);
router.post('/login', userAuth_1.userLogin);
exports.default = router;
