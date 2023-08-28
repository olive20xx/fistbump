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
const User_1 = __importDefault(require("./lib/mongoose/models/User"));
const Report_1 = __importDefault(require("./lib/mongoose/models/Report"));
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
                console.log('im looking for a user');
                const user = yield User_1.default.findOne({
                    email,
                    hashedPw: password,
                });
                console.log('ive found a user', user);
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
    },
    Mutation: {
        createUser: ({ input }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const newUser = new User_1.default(input);
                const savedUser = yield newUser.save();
                return savedUser;
            }
            catch (error) {
                throw new Error('Error creating a new user and saving it to the database');
            }
        }),
        updateUser: ({ input }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const updatedUser = yield User_1.default.findOneAndUpdate({ email: input.email }, input, { new: true });
                return updatedUser;
            }
            catch (error) {
                throw new Error('Error updating a user in the database');
            }
        }),
        updateReport: ({ targetId, cycleId, input, }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const filter = { '_id.target': targetId, '_id.cycle': cycleId };
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
