"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEAMS = void 0;
const generate_teams_1 = require("./generate-teams");
exports.TEAMS = {
    FOUNDERS: 'Founders',
    STDNT_EXP: 'Student Experience',
    MKTING: 'Marketing',
    INSTR: 'Instructors',
    STUDS: 'Students',
};
function generateArolDevTeams(olgaId, arolId) {
    const founders = (0, generate_teams_1.generateTeam)(exports.TEAMS.FOUNDERS, olgaId);
    const studentXp = (0, generate_teams_1.generateTeam)(exports.TEAMS.STDNT_EXP, olgaId);
    const marketing = (0, generate_teams_1.generateTeam)(exports.TEAMS.MKTING, olgaId);
    const instructors = (0, generate_teams_1.generateTeam)(exports.TEAMS.INSTR, arolId);
    const students = (0, generate_teams_1.generateTeam)(exports.TEAMS.STUDS, arolId);
    return [founders, studentXp, marketing, instructors, students];
}
exports.default = generateArolDevTeams;
