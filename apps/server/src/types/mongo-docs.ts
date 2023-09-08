import { Document } from 'mongoose'
import { modelTypes } from './export'

export type ReportDoc = Document<unknown, {}, modelTypes.ReportModel> &
  modelTypes.ReportModel &
  Required<{
    _id: modelTypes.ReportId
  }>
