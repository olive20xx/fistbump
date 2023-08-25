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
exports.resolvers = void 0;
const Report_1 = __importDefault(require("./lib/mongoose/models/Report"));
const User_1 = __importDefault(require("./lib/mongoose/models/User"));
exports.resolvers = {
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
            console.log('this is the id i get', id);
            try {
                const user = yield User_1.default.findById(id);
                return user;
            }
            catch (error) {
                throw new Error('Error fetching users from the database');
            }
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
        changeUser: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const updatedUser = yield User_1.default.findOneAndUpdate({ email: input.email }, input, { new: true });
                return updatedUser;
            }
            catch (error) {
                throw new Error('Error updating a user in the database');
            }
        }),
        getReport: (_, { targetId, cycleId, }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                console.log('this is what i get ', targetId, cycleId);
                const report = yield Report_1.default.findOne({
                    '_id.target': targetId,
                    '_id.cycle': cycleId,
                });
                return report;
            }
            catch (error) {
                throw new Error('Error fetching report from the database');
            }
        }),
    },
};
