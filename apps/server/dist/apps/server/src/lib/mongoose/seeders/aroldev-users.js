"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generate_users_1 = require("./generate-users");
const aroldev_teams_1 = require("./aroldev-teams");
// COMPANY
const COMPANY_NAME = 'Arol.Dev';
const RUBEN = 'Ruben';
// FOUNDERS
const olga = (0, generate_users_1.generateSpecificUserModel)('Olga', 'Dev', // Shirokova
'CEO', // if you change this, you need to change seeder-aroldev.ts
true, aroldev_teams_1.TEAMS.FOUNDERS, COMPANY_NAME);
const arol = (0, generate_users_1.generateSpecificUserModel)('Arol', 'Dev', // Viñolas
'CTO', // if you change this, you need to change seeder-aroldev.ts
false, aroldev_teams_1.TEAMS.FOUNDERS, COMPANY_NAME);
// STUDENT EXP
const julia = (0, generate_users_1.generateSpecificUserModel)('Julia', 'Reiterlehner', 'Director', false, aroldev_teams_1.TEAMS.STDNT_EXP, COMPANY_NAME);
// MARKETING
const nat = (0, generate_users_1.generateSpecificUserModel)('Natalie', 'Barresi', 'Marketer', false, aroldev_teams_1.TEAMS.MKTING, COMPANY_NAME);
// INSTRUCTORS
const edu = (0, generate_users_1.generateSpecificUserModel)('Eduardo', 'Íñigo', 'Software Engineer', false, aroldev_teams_1.TEAMS.INSTR, COMPANY_NAME);
const ruben = (0, generate_users_1.generateSpecificUserModel)(RUBEN, 'Guedes Rodríguez', 'Software Engineer', false, aroldev_teams_1.TEAMS.INSTR, COMPANY_NAME);
const rita = (0, generate_users_1.generateSpecificUserModel)('Rita', 'Varetckaia', 'Killer', false, aroldev_teams_1.TEAMS.STUDS, COMPANY_NAME);
const craig = (0, generate_users_1.generateSpecificUserModel)('Craig', 'Ostrin', 'Joker', false, aroldev_teams_1.TEAMS.STUDS, COMPANY_NAME);
const hrvoje = (0, generate_users_1.generateSpecificUserModel)('Hrvoje', 'Vincek', 'Jesus', false, aroldev_teams_1.TEAMS.STUDS, COMPANY_NAME);
const muto = (0, generate_users_1.generateSpecificUserModel)('Mutalip', 'Aydemir', 'The Indian Scout', false, aroldev_teams_1.TEAMS.STUDS, COMPANY_NAME);
const userInput = [
    olga,
    arol,
    julia,
    nat,
    edu,
    ruben,
    rita,
    craig,
    hrvoje,
    muto,
];
exports.default = userInput;
