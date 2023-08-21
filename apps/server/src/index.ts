import express from 'express'
import mongoose from 'mongoose'
import { MONGODB_URL } from './lib/constants'
import router from './router'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

app.use(router)

app.listen(8080, () => {
  console.log('connectig to db...', MONGODB_URL)

  console.log('360 review server is listening on port 8080! 🤜🏼🤛🏼')
})
