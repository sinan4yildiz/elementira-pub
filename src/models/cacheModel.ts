import { env } from '@constants/index'
import { AllProvidersType } from '@lib/types'
import { model, models, Schema } from 'mongoose'

export interface CacheSchemaInterface {
   provider: keyof AllProvidersType
   key: string
   searchQuery: string
   data: string
   createdAt: Date
}

const cacheSchema = new Schema<CacheSchemaInterface>({
   provider: {
      type: String,
      required: true
   },
   key: {
      type: String,
      required: true
   },
   searchQuery: {
      type: String,
      required: true
   },
   data: {
      type: String,
      required: true
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
})

if (env.private.APP_ENV !== 'production') delete models.cache

const cacheModel = models.cache || model('cache', cacheSchema)

export default cacheModel
