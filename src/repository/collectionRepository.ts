import collectionModel, { CollectionSchemaInterface } from '@models/collectionModel'
import { HydratedDocument, Schema } from 'mongoose'

class CollectionRepository {
   private readonly model

   constructor() {
      this.model = collectionModel
   }

   public async create(
      data: Omit<CollectionSchemaInterface, 'isActive' | 'createdAt'>
   ): Promise<HydratedDocument<CollectionSchemaInterface>> {
      const collection = await new this.model(data)

      await collection.save()

      return collection
   }

   public async find(
      filter: Partial<{ [K in keyof CollectionSchemaInterface]: any }>
   ): Promise<HydratedDocument<CollectionSchemaInterface>> {
      return await this.model.findOne(filter).populate('assets').exec()
   }

   public async findById(id: Schema.Types.ObjectId): Promise<HydratedDocument<CollectionSchemaInterface>> {
      return await this.model.findById(id).exec()
   }

   public async list(assetType: string, userId: string): Promise<HydratedDocument<CollectionSchemaInterface>[]> {
      return await this.model
         .find({
            assetType: assetType,
            user: userId
         })
         .sort({ createdAt: 'desc' })
         .populate('assets')
   }
}

export default CollectionRepository
