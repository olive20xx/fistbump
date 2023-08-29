"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: { type: String, unique: true },
    managerId: mongoose_1.Schema.Types.ObjectId
});
const Team = (0, mongoose_1.model)('Team', teamSchema);
exports.default = Team;
