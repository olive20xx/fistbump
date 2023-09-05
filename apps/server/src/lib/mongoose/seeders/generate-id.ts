import { Types } from 'mongoose'

const { ObjectId } = Types

function idGeneratorGenerator() {
  let idDecimal = 0

  return () => {
    idDecimal++
    const hex = idDecimal.toString(16)
    const hex24char = hex.padStart(24, '0')
    const id = new ObjectId(hex24char)
    return id
  }
}

const generateMongoId = idGeneratorGenerator()

export default generateMongoId
