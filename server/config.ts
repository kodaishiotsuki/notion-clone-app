import dotenv from 'dotenv'

dotenv.config({ path: './.env.local' })

export const PORT = process.env.PORT || '8000'
export const MONGODB_URI = process.env.MONGODB_URI as string
export const SECRET_KEY = process.env.SECRET_KEY as string
export const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY as string
