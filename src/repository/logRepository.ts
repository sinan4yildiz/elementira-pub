import logModel, { LogSchemaInterface } from '@models/logModel'
import { HydratedDocument } from 'mongoose'

class LogRepository {
   private readonly model

   constructor() {
      this.model = logModel
   }

   public async create(data: Omit<LogSchemaInterface, 'createdAt'>): Promise<HydratedDocument<LogSchemaInterface>> {
      const log = await new this.model(data)

      await log.save()

      return log
   }

   public async find(filter: Partial<LogSchemaInterface>): Promise<HydratedDocument<LogSchemaInterface>> {
      return await this.model.findOne(filter).exec()
   }

   public async list(assetType: string, userId: string): Promise<HydratedDocument<LogSchemaInterface>[]> {
      return await this.model.find({ assetType: assetType, user: userId }).sort({
         createdAt: 'desc'
      })
   }
}

export default LogRepository
