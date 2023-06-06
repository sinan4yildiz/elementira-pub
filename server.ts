require('dotenv').config({
   path: `.env.local`
})

import { IncomingMessage, ServerResponse } from 'http'
import env from './src/constants/env'

const http = require('http')
const next = require('next')

const dev = env.private.APP_ENV !== 'production'
const hostname = env.private.APP_HOST
const port = env.private.APP_PORT
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
   const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
      try {
         await handle(req, res)
      } catch (err) {
         console.error(`🦠 The server couldn't be created.`, req.url, err)

         res.statusCode = 500
         res.end('Internal server error')
      }
   })

   server.timeout = env.private.SERVER_REQUEST_TIMEOUT //ms

   server.listen(port, (err: Error) => {
      if (err) throw err

      console.log(`\n• Port: ${port}`)
      console.warn(`• Environment: ${env.private.APP_ENV}`)
      console.log(`🚀 Ready on ${env.public.APP_URL}\n`)
   })
})
