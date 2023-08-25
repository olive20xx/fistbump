"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GradeSchema = new mongoose_1.Schema({
    metric: String,
    // rating === 0 when not graded
    rating: Number,
    maxRating: Number,
    comment: String,
});
const ReviewSchema = new mongoose_1.Schema({
    // I have no idea why this has to spell out 'Schema.Types.ObjectId'
    // but in a type declaration, I can just use 'ObjectId'
    reviewer: mongoose_1.Schema.Types.ObjectId,
    submitted: Boolean,
    grades: [GradeSchema],
}, 
//* Set createdAt and updatedAt
{ timestamps: true });
const ReportSchema = new mongoose_1.Schema({
    _id: { target: mongoose_1.Schema.Types.ObjectId, cycle: mongoose_1.Schema.Types.ObjectId },
    remarks: String,
    status: String,
    reviews: {
        peer: [ReviewSchema],
        self: ReviewSchema,
    },
}, 
// Set createdAt and updatedAt
{ timestamps: true });
const Report = (0, mongoose_1.model)('Report', ReportSchema);
exports.default = Report;
