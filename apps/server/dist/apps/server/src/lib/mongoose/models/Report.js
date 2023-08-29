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
// In the schema, use 'Schema.Types.ObjectId' when defining a property
// but in a type declaration, use 'mongoose.Types.ObjectId'
const ReviewSchema = new mongoose_1.Schema({
    reviewerId: mongoose_1.Schema.Types.ObjectId,
    submitted: Boolean,
    grades: [GradeSchema],
}, 
//* timestamps automatically creates createdAt and updatedAt properties
{ timestamps: true });
const ReportSchema = new mongoose_1.Schema({
    _id: { targetId: mongoose_1.Schema.Types.ObjectId, cycleId: mongoose_1.Schema.Types.ObjectId },
    summary: String,
    status: String,
    reviews: {
        peers: [ReviewSchema],
        self: ReviewSchema,
        manager: ReviewSchema,
    },
}, 
//* timestamps automatically creates createdAt and updatedAt properties
{ timestamps: true });
const Report = (0, mongoose_1.model)('Report', ReportSchema);
exports.default = Report;
