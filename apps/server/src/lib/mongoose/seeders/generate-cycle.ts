import { CycleModel } from '../../../../../../packages/types/models'


export default function generateCycle(startDate: Date, peersPerTarget: number) {
  const title = "Cycle-" + startDate.toLocaleString()
  const nominationDeadline = addDays(startDate, 7)
  const reviewDeadline = addDays(startDate, 14)
  const reportDeadline = addDays(startDate, 21)
  const endDate = addDays(startDate, 28)
  const cycle: CycleModel = { title, startDate, endDate, peersPerTarget, nominationDeadline, reviewDeadline, reportDeadline }

  return cycle
}




function addDays(date: Date, days: number) {
  const newDate = new Date(date)
  newDate.setDate(date.getDate() + days)
  return newDate
}