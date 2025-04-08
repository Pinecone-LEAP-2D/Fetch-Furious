// index.ts
import express, {Request, Response} from 'express'
import { ProfileRouter } from './router/profile.routes'
import cors from "cors"
const app = express()
const PORT = 4000
app.use(express.json())
app.use(cors())
app.get('/', (req:Request, res:Response) => {
  res.send('test').status(200)
})
app.use('/profile', ProfileRouter)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
