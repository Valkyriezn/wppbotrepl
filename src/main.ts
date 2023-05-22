import { startConnection } from '@utils/connect.utils'
import { autonodecron } from '@utils/cron.utils'
import { mongodb } from '@utils/database/mongodb'
import { clearSession } from '@utils/helper.utils'
import connect from './server'
import express from 'express'
const app = express();
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


clearSession()
mongodb(process.env.MONGODB_URL)

startConnection().then(async (client) => {
    if (global.opts['server']) connect()
    await autonodecron(client)
})
