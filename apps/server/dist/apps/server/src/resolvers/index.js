"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const queries_1 = __importDefault(require("./queries"));
const mutations_1 = __importDefault(require("./mutations"));
const dateScalar_1 = require("./dateScalar");
const resolvers = Object.assign(Object.assign({ Date: dateScalar_1.dateScalar }, queries_1.default), mutations_1.default);
exports.default = resolvers;
