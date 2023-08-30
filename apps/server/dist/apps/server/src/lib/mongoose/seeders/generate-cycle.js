"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
function generateCycle(startDate, peersPerTarget) {
    const title = 'Cycle-' + startDate.toLocaleString();
    const nominationDeadline = (0, utils_1.addDays)(startDate, 7);
    const reviewDeadline = (0, utils_1.addDays)(startDate, 14);
    const reportDeadline = (0, utils_1.addDays)(startDate, 21);
    const endDate = (0, utils_1.addDays)(startDate, 28);
    const cycle = {
        title,
        startDate,
        endDate,
        peersPerTarget,
        nominationDeadline,
        reviewDeadline,
        reportDeadline,
    };
    return cycle;
}
exports.default = generateCycle;
