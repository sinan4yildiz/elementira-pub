import { env } from '@constants/index'
import { FeederServiceScrapersType } from '@services/feederService/types'
import { model, models, Schema } from 'mongoose'

export interface ProxySchemaInterface {
   provider: string
   proxy: keyof FeederServiceScrapersType
}

const proxySchema = new Schema<ProxySchemaInterface>({
   provider: {
      type: String,
      required: true
   },
   proxy: {
      type: String,
      required: true
   }
})

if (env.private.APP_ENV !== 'production') delete models.proxy

const proxyModel = models.proxy || model('proxy', proxySchema)

export default proxyModel
