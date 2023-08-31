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
const Report_1 = __importDefault(require("../lib/mongoose/models/Report"));
const User_1 = __importDefault(require("../lib/mongoose/models/User"));
const Cycle_1 = __importDefault(require("../lib/mongoose/models/Cycle"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const mutations = {
    Mutation: {
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
        updateAssignedReview: (_, { targetId, input, }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                //TODO get current cycle -- repeat code, should refactor
                const now = new Date();
                const cycle = yield Cycle_1.default.findOne({
                    startDate: { $lte: now },
                    endDate: { $gte: now },
                });
                if (!cycle)
                    throw new Error('Current cycle not found');
                const filter = { '_id.targetId': targetId, '_id.cycleId': cycle._id };
                const report = yield Report_1.default.findOne(filter);
                if (!report)
                    throw new Error('Report not found');
                const reviews = report.reviews;
                if (!reviews)
                    throw new Error('Report does not contain reviews property');
                const reviewerId = new ObjectId(input.reviewerId);
                let review;
                if (reviews.self.reviewerId === reviewerId)
                    review = reviews.self;
                else if (reviews.manager.reviewerId === reviewerId)
                    review = reviews.manager;
                else {
                    review = reviews.peers.find((r) => r.reviewerId === reviewerId);
                }
                if (!review)
                    throw new Error(`Review not found for reviewerId ${reviewerId}`);
                if (input.grades)
                    review.grades = input.grades;
                if (input.isDeclined !== undefined && input.isDeclined !== null) {
                    review.isDeclined = input.isDeclined;
                }
                if (input.submitted !== undefined && input.submitted !== null) {
                    review.submitted = input.submitted;
                }
                yield report.save();
                return report;
            }
            catch (error) {
                console.log(error.message);
                throw new Error('Error updating a review in the database');
            }
        }),
    },
};
exports.default = mutations;
