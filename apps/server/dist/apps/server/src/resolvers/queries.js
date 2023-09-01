
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
const Report_1 = __importDefault(require("../lib/mongoose/models/Report"));
const User_1 = __importDefault(require("../lib/mongoose/models/User"));
const Cycle_1 = __importDefault(require("../lib/mongoose/models/Cycle"));
const queries = {
    Query: {
        hello: () => {
            return 'Hello world!';
        },
        getUsers: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const users = yield User_1.default.find();
                return users;
            }
            catch (error) {
                throw new Error('Error fetching users from the database');
            }
        }),
        getUser: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findById(id);
                return user;
            }
            catch (error) {
                throw new Error('Error fetching users from the database');
            }
        }),
        getUserByEmail: (_, { email, password, }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findOne({
                    email,
                    hashedPw: password,
                });
                return user;
            }
            catch (error) {
                throw new Error('Error fetching users from the database');
            }
        }),
        getReport: (_, { targetId, cycleId, }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const report = yield Report_1.default.findOne({
                    '_id.targetId': targetId,
                    '_id.cycleId': cycleId,
                });
                return report;
            }
            catch (error) {
                throw new Error('Error fetching report from the database');
            }
        }),
        getCurrentCycle: (_) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const now = new Date();
                const cycle = yield Cycle_1.default.findOne({
                    startDate: { $lte: now },
                    endDate: { $gte: now },
                });
                return cycle;
            }
            catch (error) {
                throw new Error('Error fetching report from the database');
            }
        }),
    },
};
exports.default = queries;
