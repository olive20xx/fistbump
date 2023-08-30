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
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
// import jwt from 'jsonwebtoken';
// retrieve env vars
dotenv_1.default.config();
class Auth {
    constructor() { }
    static hashPassword(pwd) {
        return __awaiter(this, void 0, void 0, function* () {
            const saltRounds = 10;
            const salt = bcrypt_1.default.genSaltSync(saltRounds);
            return bcrypt_1.default.hashSync(pwd, salt);
        });
    }
}
exports.default = Auth;
