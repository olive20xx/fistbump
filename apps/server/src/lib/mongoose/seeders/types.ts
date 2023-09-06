import mongoose from 'mongoose'
import { modelTypes } from '@fistbump/fistbump-types'

export type UserDoc = mongoose.MergeType<
  mongoose.Document<unknown, {}, modelTypes.UserModel> &
    modelTypes.UserModel & {
      _id: mongoose.Types.ObjectId
    },
  Omit<modelTypes.UserModel, '_id'>
>

export type ObjectId = mongoose.Types.ObjectId
