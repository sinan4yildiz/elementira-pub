import relatedKeywordModel, { RelatedKeywordSchemaInterface } from '@models/relatedKeywordModel'
import { HydratedDocument } from 'mongoose'

class RelatedKeywordRepository {
   private readonly model

   constructor() {
      this.model = relatedKeywordModel
   }

   public async create(
      data: Omit<RelatedKeywordSchemaInterface, 'createdAt'>
   ): Promise<HydratedDocument<RelatedKeywordSchemaInterface>> {
      const relatedKeyword = await new this.model(data)

      await relatedKeyword.save()

      return relatedKeyword
   }

   public async find(
      filter: Partial<{ [K in keyof RelatedKeywordSchemaInterface]: any }>
   ): Promise<HydratedDocument<RelatedKeywordSchemaInterface>> {
      return await this.model.findOne(filter).exec()
   }
}

export default RelatedKeywordRepository
