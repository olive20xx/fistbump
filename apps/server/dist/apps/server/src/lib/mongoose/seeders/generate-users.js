"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = __importDefault(require("./faker"));
function generateUsers(count) {
    const users = [];
    const companyName = 'Arol.Dev';
    for (let i = 0; i < count; i++) {
        const firstName = faker_1.default.person.firstName();
        const lastName = faker_1.default.person.lastName();
        const user = {
            email: `${firstName[0].toLowerCase()}${lastName.toLowerCase()}@${companyName.toLowerCase()}`,
            fullName: `${firstName} ${lastName}`,
            hashedPw: '321',
            title: faker_1.default.person.jobTitle(),
            isAdmin: faker_1.default.datatype.boolean(),
            photo: faker_1.default.internet.avatar(),
            teamName: faker_1.default.helpers.arrayElement([
                'Staff',
                'Students',
                'Instructors',
            ]),
            companyName: companyName,
        };
        users.push(user);
    }
    return users;
}
exports.default = generateUsers;
