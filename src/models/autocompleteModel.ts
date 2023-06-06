import { env } from '@constants/index'
import { model, models, Schema } from 'mongoose'

export interface AutocompleteSchemaInterface {
   _id?: Schema.Types.ObjectId
   keyword?: string
   assetType: string
   results: string
   createdAt: Date
}

const autocompleteSchema = new Schema<AutocompleteSchemaInterface>({
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

if (env.private.APP_ENV !== 'production') delete models.autocomplete

const autocompleteModel = models.autocomplete || model('autocomplete', autocompleteSchema)

export default autocompleteModel
