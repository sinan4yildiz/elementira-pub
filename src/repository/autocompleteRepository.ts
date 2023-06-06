import autocompleteModel, { AutocompleteSchemaInterface } from '@models/autocompleteModel'
import { HydratedDocument } from 'mongoose'

class AutocompleteRepository {
   private readonly model

   constructor() {
      this.model = autocompleteModel
   }

   public async create(
      data: Omit<AutocompleteSchemaInterface, 'createdAt'>
   ): Promise<HydratedDocument<AutocompleteSchemaInterface>> {
      const autocomplete = await new this.model(data)

      await autocomplete.save()

      return autocomplete
   }

   public async find(
      filter: Partial<{ [K in keyof AutocompleteSchemaInterface]: any }>
   ): Promise<HydratedDocument<AutocompleteSchemaInterface>> {
      return await this.model.findOne(filter).exec()
   }
}

export default AutocompleteRepository
