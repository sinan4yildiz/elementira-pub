import { env } from '@constants/index'
import { IncomingMessage, ServerResponse } from 'http'
import mongoose from 'mongoose'

const mongoDB = (handler: any) => async (req: IncomingMessage, res: ServerResponse) => {
   if (mongoose.connections[0].readyState) {
      return handler(req, res)
   }

   mongoose.set('strictQuery', false)

   await mongoose.connect(
      env.private.MONGODB_URI as string,
      {
         useNewUrlParser: true,
         autoIndex: true
      } as object
   )

   return handler(req, res)
}

export default mongoDB
