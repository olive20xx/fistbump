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
        updatePeerReview: (_, { targetId, cycleId, input, }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const filter = { '_id.targetId': targetId, '_id.cycleId': cycleId };
                const report = yield Report_1.default.findOne(filter);
                const ObjectId = mongoose_1.default.Types.ObjectId;
                // if (report.reviews.peers[0].reviewerId === null) {
                //   report.reviews.peers[0].reviewerId = new ObjectId(
                //     input.newReviewerId
                //   )
                // }
                // let empty = report.reviews.peers.filter((x) => x.reviewerId === null)
                //           if (empty.length === 0) {
                //           report.updateOne(empty[0].reviewerId = new ObjectId(input.newReviewerId))
                if (report) {
                    for (let i = 0; i < report.reviews.peers.length; i++) {
                        const review = report.reviews.peers[i];
                        if (review.reviewerId === null) {
                            review.reviewerId = new ObjectId(input.newReviewerId);
                            yield report.save();
                            break;
                        }
                    }
                }
                else {
                    throw new Error('Report not found');
                }
                return report;
            }
            catch (error) {
                console.error('Error updating report:', error);
                throw new Error('Error updating a report in the database');
            }
        }),
    },
};
exports.default = mutations;
