import { env } from '@constants/index'
import { model, models, Schema } from 'mongoose'

export interface RelatedKeywordSchemaInterface {
   _id?: Schema.Types.ObjectId
   keyword?: string
   assetType: string
   results: string
   createdAt: Date
}

const relatedKeywordSchema = new Schema<RelatedKeywordSchemaInterface>({
   keyword: {
      type: String
   },
   assetType: {
      type: String,
      required: true
   },
   results: {
      type: String,
      required: true
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
})

if (env.private.APP_ENV !== 'production') delete models.relatedKeyword

const relatedKeywordModel = models.relatedKeyword || model('relatedKeyword', relatedKeywordSchema, 'relatedKeyword')

export default relatedKeywordModel
