"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cycleSchema = new mongoose_1.Schema({
    title: String,
    startDate: Date,
    endDate: Date,
    peersPerTarget: Number,
    nominationDeadline: Date,
    reviewDeadline: Date,
    reportDeadline: Date,
});
const Cycle = (0, mongoose_1.model)('Cycle', cycleSchema);
exports.default = Cycle;
