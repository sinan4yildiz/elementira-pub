import { errorHandler } from '@lib/utils'
import userModel, { UserSchemaInterface } from '@models/userModel'
import { FilterQuery, HydratedDocument, Schema } from 'mongoose'

class UserRepository {
   private readonly model

   constructor() {
      this.model = userModel
   }

   public async create(
      data: Omit<UserSchemaInterface, 'isActive' | 'createdAt'>
   ): Promise<HydratedDocument<UserSchemaInterface>> {
      const user = await new this.model(data)

      await user.save()

      return user
   }

   public async update(
      id: Schema.Types.ObjectId,
      data: Partial<{ [K in keyof UserSchemaInterface]: any }>
   ): Promise<HydratedDocument<UserSchemaInterface>> {
      const user = await this.model.findById(id)

      await user.updateOne(data)

      return user
   }

   public async find(
      filter: Partial<{ [K in keyof UserSchemaInterface]: any }>
   ): Promise<HydratedDocument<UserSchemaInterface>> {
      return await this.model.findOne(filter).exec()
   }

   public async verifySignIn(
      email: string,
      password: string
   ): Promise<boolean | HydratedDocument<UserSchemaInterface>> {
      try {
         const user = await this.model.findOne({ email: email, isActive: true })

         if (!user) return false

         if (await user.verifyPassword(password)) {
            return user
         }
      } catch (error: any) {
         errorHandler(new Error(error))
      }

      return false
   }

   public async getUserByEmail(email: string): Promise<HydratedDocument<UserSchemaInterface>> {
      return await this.model.findOne({ email: email }).exec()
   }

   public async delete(filter: FilterQuery<UserSchemaInterface>): Promise<any> {
      return await this.model.deleteMany(filter).exec()
   }
}

export default UserRepository
