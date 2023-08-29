"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTeamsWithSameManager = exports.generateTeam = void 0;
function generateTeam(name, managerId) {
    const team = { name, managerId };
    return team;
}
exports.generateTeam = generateTeam;
function generateTeamsWithSameManager(teamNames, managerId) {
    const teams = [];
    teamNames.forEach((name) => {
        const team = {
            name,
            managerId,
        };
        teams.push(team);
    });
    return teams;
}
exports.generateTeamsWithSameManager = generateTeamsWithSameManager;
