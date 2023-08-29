"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDays = void 0;
function addDays(date, days) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
}
exports.addDays = addDays;
