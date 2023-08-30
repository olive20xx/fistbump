"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickRandomReviewers = exports.generateRandomReport = exports.generateEmptyReport = void 0;
const faker_1 = __importDefault(require("./faker"));
const models_1 = require("../../../../../../packages/types/models");
function generateGrades(count, maxRating, isFilled) {
    const grades = [];
    const metrics = faker_1.default.helpers.arrayElements([
        'Looks',
        'Coding',
        'Punctuality',
        'Cooking',
        'Volleyball',
        'Skating',
        'Crime',
        'Being From Cuba',
        'Power',
        'Agility',
        'Endurance',
        'Danger',
        'Charm',
        'Spellcasting',
        'Storytelling',
        'Futbol',
        'Handstands',
    ], count);
    for (let i = 0; i < count; i++) {
        const grade = {
            metric: metrics[i],
            rating: isFilled ? faker_1.default.number.int({ min: 1, max: maxRating }) : 0,
            maxRating: maxRating,
            comment: isFilled ? faker_1.default.lorem.lines({ min: 1, max: 3 }) : '',
        };
        grades.push(grade);
    }
    return grades;
}
function generateReview(metricCount, maxRating, reviewerId = null, isGraded = false) {
    const review = {
        reviewerId,
        isDeclined: false,
        submitted: isGraded,
        grades: generateGrades(metricCount, maxRating, isGraded),
    };
    return review;
}
function generateEmptyReport(targetId, cycleId, managerId, peersPerTarget, metricCount, maxRating) {
    const peers = [];
    for (let i = 0; i < peersPerTarget; i++) {
        const review = generateReview(metricCount, maxRating);
        peers.push(review);
    }
    const report = {
        _id: { targetId, cycleId },
        summary: '',
        status: 'Nomination',
        reviews: {
            peers,
            self: generateReview(metricCount, maxRating, targetId),
            manager: generateReview(metricCount, maxRating, managerId),
        },
    };
    return report;
}
exports.generateEmptyReport = generateEmptyReport;
function generateRandomReport(targetId, cycleId, managerId, reviewers, metricCount, maxRating, areReviewsEmpty) {
    const peerReviews = [];
    for (let i = 0; i < reviewers.length; i++) {
        const reviewerId = reviewers[i];
        const review = generateReview(metricCount, maxRating, reviewerId, areReviewsEmpty);
        peerReviews.push(review);
    }
    const report = {
        _id: { targetId, cycleId },
        summary: faker_1.default.lorem.paragraph({ min: 2, max: 4 }),
        status: faker_1.default.helpers.objectValue(models_1.REPORT_STATUS),
        reviews: {
            peers: peerReviews,
            self: generateReview(metricCount, maxRating, targetId),
            manager: generateReview(metricCount, maxRating, managerId),
        },
    };
    return report;
}
exports.generateRandomReport = generateRandomReport;
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
exports.pickRandomReviewers = pickRandomReviewers;
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
