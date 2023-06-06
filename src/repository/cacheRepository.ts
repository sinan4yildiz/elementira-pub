import { encodeStr } from '@lib/utils'
import cacheModel, { CacheSchemaInterface } from '@models/cacheModel'
import { SearchQueryObjectType } from '@services/searchService/types'
import { Filter } from 'mongodb'
import { FilterQuery, HydratedDocument } from 'mongoose'

class CacheRepository {
   private readonly model

   constructor() {
      this.model = cacheModel
   }

   public async store(
      data: Omit<CacheSchemaInterface, 'key' | 'createdAt'>
   ): Promise<HydratedDocument<CacheSchemaInterface>> {
      const cache = await new this.model({
         provider: data.provider,
         key: encodeStr(data.searchQuery),
         searchQuery: data.searchQuery,
         data: data.data
      })

      await cache.save()

      return cache
   }

   public async find(filter: Filter<CacheSchemaInterface>): Promise<HydratedDocument<CacheSchemaInterface>> {
      return await this.model.findOne(filter as FilterQuery<CacheSchemaInterface>).exec()
   }

   public async getBySearchQuery({
      searchQuery,
      provider
   }: {
      searchQuery: SearchQueryObjectType
      provider: string
   }): Promise<HydratedDocument<CacheSchemaInterface>> {
      const key = encodeStr(JSON.stringify(searchQuery))

      return await this.model.findOne({ key: key, provider: provider }).exec()
   }

   public async delete(filter: Partial<{ [K in keyof CacheSchemaInterface]: any }>): Promise<any> {
      return await this.model.deleteMany(filter).exec()
   }
}

export default CacheRepository
