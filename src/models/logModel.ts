import { env } from '@constants/index'
import { model, models, Schema } from 'mongoose'

export interface LogSchemaInterface {
   name: string
   stack?: string
   message: string
   context?: string
   path?: string
   createdAt: Date
}

const logSchema = new Schema<LogSchemaInterface>({
   name: {
      type: String,
      required: true
   },
   stack: {
      type: String
   },
   message: {
      type: String,
      required: true
   },
   context: {
      type: String
   },
   path: {
      type: String
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
})

if (env.private.APP_ENV !== 'production') delete models.log

const logModel = models.log || model('log', logSchema)

export default logModel
