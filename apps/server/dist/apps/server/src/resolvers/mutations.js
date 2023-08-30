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
const services_auth_1 = __importDefault(require("../lib/services/services.auth"));
const mutations = {
    Mutation: {
        signup: (_, { email, hashedPw }) => __awaiter(void 0, void 0, void 0, function* () {
            const hashedPwd = yield services_auth_1.default.hashPassword(hashedPw);
            const user = new User_1.default({ email, hashedPw: hashedPwd });
            yield user.save();
            return 'user created';
        }),
        createUser: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const newUser = new User_1.default(input);
                const savedUser = yield newUser.save();
                return savedUser;
            }
            catch (error) {
                throw new Error('Error creating a new user and saving it to the database');
            }
        }),
        updateUser: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const updatedUser = yield User_1.default.findOneAndUpdate({ email: input.email }, input, { new: true });
                return updatedUser;
            }
            catch (error) {
                throw new Error('Error updating a user in the database');
            }
        }),
        updateReport: (_, { targetId, cycleId, input, }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const filter = { '_id.targetId': targetId, '_id.cycleId': cycleId };
                const updatedReport = yield Report_1.default.findOneAndUpdate(filter, input, {
                    new: true,
                });
                return updatedReport;
            }
            catch (error) {
                throw new Error('Error updating a report in the database');
            }
        }),
    },
};
exports.default = mutations;
