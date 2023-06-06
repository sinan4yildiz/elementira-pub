import searchModel, { SearchSchemaInterface } from '@models/searchModel'
import mongoose, { HydratedDocument, Schema } from 'mongoose'

class SearchRepository {
   private readonly model

   constructor() {
      this.model = searchModel
   }

   public async create(
      data: Omit<SearchSchemaInterface, 'createdAt' | 'deletedAt'>
   ): Promise<HydratedDocument<SearchSchemaInterface>> {
      const search = await new this.model(data)

      await search.save()

      return search
   }

   public async find(
      filter: Partial<{ [K in keyof SearchSchemaInterface]: any }>
   ): Promise<HydratedDocument<SearchSchemaInterface>> {
      return await this.model.findOne(filter).exec()
   }

   public async findById(id: Schema.Types.ObjectId): Promise<HydratedDocument<SearchSchemaInterface>> {
      return await this.model.findById(id).exec()
   }

   public async list(assetType: string, userId: string): Promise<HydratedDocument<SearchSchemaInterface>[]> {
      return await this.model
         .find({
            assetType: assetType,
            user: userId
         })
         .sort({ createdAt: 'desc' })
   }

   public async recentSearches(assetType: string, userId: string): Promise<HydratedDocument<SearchSchemaInterface>[]> {
      return await this.model
         .aggregate([
            {
               $match: {
                  $and: [
                     {
                        assetType: { $eq: assetType }
                     },
                     {
                        user: { $eq: new mongoose.Types.ObjectId(userId) }
                     },
                     {
                        keyword: { $ne: null }
                     },
                     {
                        deletedAt: { $eq: null }
                     }
                  ]
               }
            },
            {
               $group: {
                  _id: '$keyword',
                  keyword: { $first: '$keyword' },
                  createdAt: { $last: '$createdAt' }
               }
            },
            {
               $sort: { createdAt: -1 }
            }
         ])
         .limit(10)
   }

   public async clearRecentSearches(assetType: string, userId: string): Promise<any> {
      return await this.model
         .updateMany(
            {
               assetType: { $eq: assetType },
               user: new mongoose.Types.ObjectId(userId)
            },
            {
               $set: {
                  deletedAt: new Date()
               }
            }
         )
         .exec()
   }
}

export default SearchRepository
