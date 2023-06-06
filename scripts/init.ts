require('dotenv').config({
   path: `.env.local`
})

import { env } from '@constants/index'

const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(env.private.MONGODB_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true
})
