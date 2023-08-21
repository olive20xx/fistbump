import express from 'express'
import mongoose from 'mongoose'
import { MONGODB_URL } from './lib/constants'
import router from './router'
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.use(router)

app.listen(8080, () => {
  console.log('connectig to db...', MONGODB_URL)
  mongoose.connect(MONGODB_URL).then(() => console.log('connected to db!')).catch((error) => console.log(error)) 
  
  console.log('360 review server is listening on port 8080! 🤜🏼🤛🏼')
})
