"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const en_GB_1 = require("@faker-js/faker/locale/en_GB");
const SEED = 1;
const faker = en_GB_1.faker;
faker.seed(SEED);
exports.default = faker;
