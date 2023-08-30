import mongoose from 'mongoose'
import { UserModel } from '../../../../../../packages/types/models'

export type UserDoc = mongoose.MergeType<
  mongoose.Document<unknown, {}, UserModel> &
    UserModel & {
      _id: mongoose.Types.ObjectId
    },
  Omit<UserModel, '_id'>
>

export type ObjectId = mongoose.Types.ObjectId
