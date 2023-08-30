"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSpecificUserModel = exports.generateRandomUserModels = void 0;
const faker_1 = __importDefault(require("./faker"));
const PASSWORD = '321';
function generateRandomUserModels(count, companyName) {
    const users = [];
    for (let i = 0; i < count; i++) {
        const firstName = faker_1.default.person.firstName();
        const lastName = faker_1.default.person.lastName();
        const user = {
            email: `${firstName[0].toLowerCase()}${lastName.toLowerCase()}@${companyName.toLowerCase()}`,
            fullName: `${firstName} ${lastName}`,
            hashedPw: PASSWORD,
            title: faker_1.default.person.jobTitle(),
            isAdmin: faker_1.default.datatype.boolean(),
            photo: faker_1.default.internet.avatar(),
            teamName: faker_1.default.helpers.arrayElement([
                'Staff',
                'Students',
                'Instructors',
            ]),
            companyName,
        };
        users.push(user);
    }
    return users;
}
exports.generateRandomUserModels = generateRandomUserModels;
function generateSpecificUserModel(firstName, lastName, title, isAdmin, teamName, companyName) {
    const user = {
        email: `${firstName.toLowerCase()}@${companyName.toLowerCase()}`,
        fullName: `${firstName} ${lastName}`,
        hashedPw: PASSWORD,
        title,
        isAdmin,
        photo: faker_1.default.internet.avatar(),
        teamName,
        companyName,
    };
    return user;
}
exports.generateSpecificUserModel = generateSpecificUserModel;
