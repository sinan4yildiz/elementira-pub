import { env } from '@constants/index'
import { model, models, Schema } from 'mongoose'

export interface CollectionSchemaInterface {
   _id?: Schema.Types.ObjectId
   name: string
   assetType: string
   user: Schema.Types.ObjectId
   createdAt: Date
   assets?: Schema.Types.ObjectId
}

const collectionSchema = new Schema<CollectionSchemaInterface>({
   name: {
      type: String,
      required: true
   },
   assetType: {
      type: String,
      required: true
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
   },
   assets: [
      {
         type: Schema.Types.ObjectId,
         ref: 'collectionAsset'
      }
   ],
   createdAt: {
      type: Date,
      default: Date.now
   }
})

if (env.private.APP_ENV !== 'production') delete models.collection

const collectionModel = models.collection || model('collection', collectionSchema)

export default collectionModel
