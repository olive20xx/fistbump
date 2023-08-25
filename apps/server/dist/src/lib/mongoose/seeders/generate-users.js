"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = __importDefault(require("./faker"));
function generateUsers(count) {
    const users = [];
    for (let i = 0; i < count; i++) {
        const user = {
            email: faker_1.default.internet.email(),
            fullName: faker_1.default.person.fullName(),
            hashedPw: faker_1.default.string.hexadecimal(),
            title: faker_1.default.person.jobTitle(),
            isOlga: faker_1.default.datatype.boolean(),
            photo: faker_1.default.internet.avatar(),
            teamName: faker_1.default.helpers.arrayElement(['Staff, Students, Instructors']),
            companyName: 'Arol.Dev',
        };
        users.push(user);
    }
    return users;
}
exports.default = generateUsers;
