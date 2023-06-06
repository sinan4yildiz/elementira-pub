import { env } from '@constants/index'
import collectionModel from '@models/collectionModel'
import { model, models, Schema } from 'mongoose'

export interface CollectionAssetSchemaInterface {
   _id?: Schema.Types.ObjectId
   relatedCollection: Schema.Types.ObjectId
   assetType: string
   provider: string
   assetUrl: string
   asset: string
   createdAt: Date
}

const collectionAssetSchema = new Schema<CollectionAssetSchemaInterface>({
   relatedCollection: {
      type: Schema.Types.ObjectId,
      ref: 'collection',
      required: true
   },
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
   createdAt: {
      type: Date,
      default: Date.now
   }
})

collectionAssetSchema.post('save', async function (doc) {
   await collectionModel.findByIdAndUpdate(doc.relatedCollection, {
      $push: {
         assets: {
            _id: doc._id
         }
      }
   })
})

if (env.private.APP_ENV !== 'production') delete models.collectionAsset

const collectionAssetModel =
   models.collectionAsset || model('collectionAsset', collectionAssetSchema, 'collectionAssets')

export default collectionAssetModel
