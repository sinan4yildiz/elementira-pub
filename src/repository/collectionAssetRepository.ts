import collectionAssetModel, { CollectionAssetSchemaInterface } from '@models/collectionAssetModel'
import { HydratedDocument } from 'mongoose'

class CollectionAssetRepository {
   private readonly model

   constructor() {
      this.model = collectionAssetModel
   }

   public async create(
      data: Omit<CollectionAssetSchemaInterface, 'createdAt'>
   ): Promise<HydratedDocument<CollectionAssetSchemaInterface>> {
      const collectionAsset = await new this.model(data)

      await collectionAsset.save()

      return collectionAsset
   }

   public async find(
      filter: Partial<{ [K in keyof CollectionAssetSchemaInterface]: any }>
   ): Promise<HydratedDocument<CollectionAssetSchemaInterface>> {
      return await this.model.findOne(filter).exec()
   }

   public async delete(filter: Partial<{ [K in keyof CollectionAssetSchemaInterface]: any }>): Promise<any> {
      return await this.model.deleteMany(filter).exec()
   }
}

export default CollectionAssetRepository
