"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const Cycle_1 = __importDefault(require("../models/Cycle"));
const User_1 = __importDefault(require("../models/User"));
const generate_cycle_1 = __importDefault(require("./generate-cycle"));
const aroldev_users_1 = __importDefault(require("./aroldev-users"));
const generate_reports_1 = require("./generate-reports");
const Report_1 = __importDefault(require("../models/Report"));
const aroldev_teams_1 = __importStar(require("./aroldev-teams"));
const Team_1 = __importDefault(require("../models/Team"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const utils_1 = require("../../utils");
// CYCLE CONFIG
const yesterday = (0, utils_1.addDays)(new Date(), -1);
const CYCLE_START = yesterday;
const CYCLE_PEERS_PER_TARGET = 3;
//TODO I think the Cycle model needs a Grade Template
const GRADES_PER_REVIEW = 3;
const MAX_RATING = 5;
const mongoURL = process.env.MONGODB_URL;
const cycleInput = (0, generate_cycle_1.default)(CYCLE_START, CYCLE_PEERS_PER_TARGET);
// Connect to mongodb implementation
function seedDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (mongoURL === undefined)
                throw new Error('Could not get MongoDB URL from .env');
            yield mongoose_1.default.connect(mongoURL);
            yield mongoose_1.default.connection.db.dropDatabase();
            console.log('🧑🏻‍💻👍🏻 Connected to DB');
            yield seedArolDevData();
            mongoose_1.default.connection.close();
        }
        catch (error) {
            console.log(error.message);
        }
    });
}
function seedArolDevData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cycle = yield Cycle_1.default.create(cycleInput);
            if (!cycle)
                throw new Error('Cycle.create() failed');
            console.log(`💜 CYCLE ID: '${cycle._id}' 💜`);
            const users = yield User_1.default.insertMany(aroldev_users_1.default);
            if (!users)
                throw new Error('User.insertMany() failed');
            console.log(`${users.length} users have been added to the database`);
            console.log(users);
            const arol = users.find((user) => {
                return user.title === 'CTO';
            });
            console.log('AROL', arol);
            if (!arol)
                throw new Error('Arol not found in users collection');
            const olga = users.find((user) => {
                return user.title === 'CEO';
            });
            if (!olga)
                throw new Error('Olga not found in users collection');
            const teamsInput = (0, aroldev_teams_1.default)(olga._id, arol._id);
            const teams = yield Team_1.default.insertMany(teamsInput);
            if (!teams)
                throw new Error('Team.insertMany() failed');
            console.log(`${teams.length} teams have been added to the database`);
            console.log(teams);
            const reportInput = [];
            users.forEach((user) => {
                let managerId;
                if (user.teamName === aroldev_teams_1.TEAMS.STUDS || user.teamName === aroldev_teams_1.TEAMS.INSTR) {
                    managerId = arol._id;
                }
                else {
                    managerId = olga._id;
                }
                const report = (0, generate_reports_1.generateEmptyReport)(user._id, cycle._id, managerId, cycle.peersPerTarget, GRADES_PER_REVIEW, MAX_RATING);
                reportInput.push(report);
            });
            const reports = yield Report_1.default.insertMany(reportInput);
            if (!reports)
                throw new Error('Report.insertMany() failed');
            console.log(`${reports.length} reports have been added to the database`);
            console.log('😱 first report 😱 —> ', reports[0]);
        }
        catch (error) {
            console.log(error.message);
        }
    });
}
exports.default = seedDb;
