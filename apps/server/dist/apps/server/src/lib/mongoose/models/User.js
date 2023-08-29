"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: String,
    fullName: String,
    hashedPw: String,
    title: String,
    isAdmin: Boolean,
    photo: String,
    teamName: String,
    companyName: String,
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
