import likeModel, { LikeSchemaInterface } from '@models/likeModel'
import { HydratedDocument } from 'mongoose'

class LikeRepository {
   private readonly model

   constructor() {
      this.model = likeModel
   }

   public async create(data: Omit<LikeSchemaInterface, 'createdAt'>): Promise<HydratedDocument<LikeSchemaInterface>> {
      const like = await new this.model(data)

      await like.save()

      return like
   }

   public async find(filter: Partial<LikeSchemaInterface>): Promise<HydratedDocument<LikeSchemaInterface>> {
      return await this.model.findOne(filter).exec()
   }

   public async list(assetType: string, userId: string): Promise<HydratedDocument<LikeSchemaInterface>[]> {
      return await this.model.find({ assetType: assetType, user: userId }).sort({
         createdAt: 'desc'
      })
   }
}

export default LikeRepository
