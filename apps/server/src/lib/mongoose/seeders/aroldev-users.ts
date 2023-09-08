import { modelTypes } from '../../../types/export'
import { generateSpecificUserModel } from './generate-users'
import { TEAMS } from './aroldev-teams'

// COMPANY
const COMPANY_NAME = 'Arol.Dev'

type Ruben = 'Ruben'
const RUBEN: Ruben = 'Ruben'

// FOUNDERS
const olga = generateSpecificUserModel(
  'Olga',
  'Dev', // Shirokova
  'CEO', // if you change this, you need to change seeder-aroldev.ts
  true,
  TEAMS.FOUNDERS,
  COMPANY_NAME
)
const arol = generateSpecificUserModel(
  'Arol',
  'Dev', // Viñolas
  'CTO', // if you change this, you need to change seeder-aroldev.ts
  false,
  TEAMS.FOUNDERS,
  COMPANY_NAME
)

// STUDENT EXP
const julia = generateSpecificUserModel(
  'Julia',
  'Reiterlehner',
  'Director',
  false,
  TEAMS.STDNT_EXP,
  COMPANY_NAME
)

// MARKETING
const nat = generateSpecificUserModel(
  'Natalie',
  'Barresi',
  'Content Creator',
  false,
  TEAMS.MKTING,
  COMPANY_NAME
)

// INSTRUCTORS
const edu = generateSpecificUserModel(
  'Eduardo',
  'Íñigo',
  'Software Engineer',
  false,
  TEAMS.INSTR,
  COMPANY_NAME
)
const ruben = generateSpecificUserModel(
  RUBEN,
  'Guedes Rodríguez',
  'Software Engineer',
  false,
  TEAMS.INSTR,
  COMPANY_NAME
)

const rita = generateSpecificUserModel(
  'Rita',
  'Varetckaia',
  'Student',
  false,
  TEAMS.STUDS,
  COMPANY_NAME
)
const craig = generateSpecificUserModel(
  'Craig',
  'Ostrin',
  'Student',
  false,
  TEAMS.STUDS,
  COMPANY_NAME
)
const hrvoje = generateSpecificUserModel(
  'Hrvoje',
  'Vincek',
  'Student',
  false,
  TEAMS.STUDS,
  COMPANY_NAME
)
const muto = generateSpecificUserModel(
  'Mutalip',
  'Aydemir',
  'Student',
  false,
  TEAMS.STUDS,
  COMPANY_NAME
)

const userInput: modelTypes.UserModel[] = [
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
]

export default userInput
