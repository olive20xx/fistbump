import express from 'express'
import User from './lib/mongoose/models/User'
import Report from './lib/mongoose/models/Report'

const router = express.Router()

router.get('/', async (_, res) => {
  try {
    const data = await Report.find()
    console.log('data', data)
    res.json(data)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

export default router
