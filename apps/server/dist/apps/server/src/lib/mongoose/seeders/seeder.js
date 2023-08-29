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
const mongoose_1 = __importDefault(require("mongoose"));
const generate_users_1 = __importDefault(require("./generate-users"));
require("dotenv/config");
const User_1 = __importDefault(require("../models/User"));
const generate_reports_1 = __importDefault(require("./generate-reports"));
const Report_1 = __importDefault(require("../models/Report"));
const Cycle_1 = __importDefault(require("../models/Cycle"));
const NUMBER_OF_USERS = 10;
const NUMBER_OF_PEER_REVIEWS = 1;
const NUMBER_OF_METRICS = 3;
const MAX_RATING = 5;
const mongoURL = process.env.MONGODB_URL;
// Connect to mongodb implementation
function seedDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (mongoURL === undefined)
                throw new Error('Could not get MongoDB URL from .env');
            yield mongoose_1.default.connect(mongoURL);
            yield mongoose_1.default.connection.db.dropDatabase();
            console.log('🧑🏻‍💻👍🏻 Connected to DB');
            yield seedData(NUMBER_OF_USERS);
            mongoose_1.default.connection.close();
        }
        catch (error) {
            console.log(error.message);
        }
    });
}
function seedData(count) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cycle = yield Cycle_1.default.create({
                title: 'Hello',
                startDate: '2023-01-01',
                endDate: '2023-12-25',
                peersPerTarget: '3',
                nominationDeadline: '2023-09-11',
                reviewDeadline: '2023-09-11',
                reportDeadline: '2023-09-11',
            });
            console.log('🩷🩷🩷🩷 cycle', cycle);
            const userInput = (0, generate_users_1.default)(count);
            const users = yield User_1.default.insertMany(userInput);
            if (!users)
                throw new Error('User.insertMany() failed');
            console.log(`${users.length} users have been added to the database`);
            console.log(users);
            const fakeCycle = '131313';
            const fakeManager = new mongoose_1.default.Types.ObjectId();
            console.log(`💜 CYCLE ID: '${fakeCycle}' 💜`);
            const reportInput = [];
            users.forEach((user, index) => {
                const reviewers = pickRandomReviewers(user._id, users, NUMBER_OF_PEER_REVIEWS);
                //! ~half the reports will have empty reviews
                const areReviewsEmpty = index < users.length / 2;
                const report = (0, generate_reports_1.default)(user._id, fakeCycle, fakeManager, reviewers, NUMBER_OF_METRICS, MAX_RATING, areReviewsEmpty);
                reportInput.push(report);
            });
            const reports = yield Report_1.default.insertMany(reportInput);
            if (!reports)
                throw new Error('Report.insertMany() failed');
            console.log(`${reports.length} reports have been added to the database`);
            console.log(reports[8].reviews.peers[0]);
        }
        catch (error) {
            console.log(error.message);
        }
    });
}
function pickRandomReviewers(targetId, users, reviewerCount) {
    const reviewers = [];
    while (reviewers.length < reviewerCount) {
        const i = getRandomInt(users.length - 1);
        const user = users[i];
        if (user._id !== targetId)
            reviewers.push(user._id);
    }
    return reviewers;
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
exports.default = seedDb;
