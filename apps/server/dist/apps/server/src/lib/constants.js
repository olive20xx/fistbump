"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.MONGODB_URL = ensureEnvVarExist('MONGODB_URL');
function ensureEnvVarExist(name) {
    const value = process.env[name];
    if (value === undefined) {
        throw new Error(`${name} must be defined as an env variable`);
    }
    return value;
}
