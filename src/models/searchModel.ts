import { env } from '@constants/index'
import { model, models, Schema } from 'mongoose'

export interface SearchSchemaInterface {
   _id?: Schema.Types.ObjectId
   query: string
   keyword?: string
   assetType: string
   provider: string
   found: number
   user: Schema.Types.ObjectId
   deletedAt: Date
   createdAt: Date
}

const searchSchema = new Schema<SearchSchemaInterface>({
   query: {
      type: String,
      required: true
   },
   keyword: {
      type: String
   },
   assetType: {
      type: String,
      required: true
   },
   provider: {
      type: String,
      required: true
   },
   found: {
      type: Number,
      required: true
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
   },
   createdAt: {
      type: Date,
      default: Date.now
   },
   deletedAt: {
      type: Date
   }
})

if (env.private.APP_ENV !== 'production') delete models.search

const searchModel = models.search || model('search', searchSchema)

export default searchModel
