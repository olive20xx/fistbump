"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = __importDefault(require("./faker"));
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
        'Raw Power',
        'Animal Magnetism',
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
function generateReview(reviewer, metricCount, maxRating, isGraded = false) {
    const review = {
        reviewer: reviewer,
        isDeclined: false,
        submitted: isGraded,
        grades: generateGrades(metricCount, maxRating, isGraded),
    };
    return review;
}
function generateReport(target, cycle, reviewers, metricCount, maxRating, areReviewsEmpty) {
    const peerReviews = [];
    for (let i = 0; i < reviewers.length; i++) {
        const reviewerId = reviewers[i];
        const review = generateReview(reviewerId, metricCount, maxRating, areReviewsEmpty);
        peerReviews.push(review);
    }
    const report = {
        _id: { target, cycle },
        remarks: faker_1.default.lorem.paragraph({ min: 2, max: 4 }),
        status: faker_1.default.helpers.arrayElement([
            'Nomination',
            'Review',
            'Report',
            'Completed',
        ]),
        reviews: {
            peer: peerReviews,
            self: generateReview(target, metricCount, maxRating),
        },
    };
    return report;
}
exports.default = generateReport;
