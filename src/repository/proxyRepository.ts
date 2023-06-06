import proxyModel, { ProxySchemaInterface } from '@models/proxyModel'
import { HydratedDocument } from 'mongoose'

class ProxyRepository {
   private readonly model

   constructor() {
      this.model = proxyModel
   }

   public async create(data: Omit<ProxySchemaInterface, ''>): Promise<HydratedDocument<ProxySchemaInterface>> {
      const proxy = await new this.model(data)

      await proxy.save()

      return proxy
   }

   public async find(filter: Partial<ProxySchemaInterface>): Promise<HydratedDocument<ProxySchemaInterface>> {
      return await this.model.findOne(filter).exec()
   }
}

export default ProxyRepository
