import { env } from '@constants/index'
import { model, models, Schema } from 'mongoose'

export interface LikeSchemaInterface {
   assetType: string
   provider: string
   assetUrl: string
   asset: string
   user: Schema.Types.ObjectId
   createdAt: Date
}

const likeSchema = new Schema<LikeSchemaInterface>({
   assetType: {
      type: String,
      required: true
   },
   provider: {
      type: String,
      required: true
   },
   assetUrl: {
      type: String,
      required: true
   },
   asset: {
      type: String,
      required: true
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
})

if (env.private.APP_ENV !== 'production') delete models.like

const likeModel = models.like || model('like', likeSchema)

export default likeModel
