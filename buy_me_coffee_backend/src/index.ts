// index.ts
import express, {Request, Response} from 'express'

const app = express()
const PORT = 4000

app.get('/', (req:Request, res:Response) => {
  res.send('test').status(200)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
