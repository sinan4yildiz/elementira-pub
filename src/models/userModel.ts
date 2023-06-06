import { env } from '@constants/index'
import { errorLogger } from '@lib/serverUtils'
import { titleCase } from '@lib/utils'
import { model, models, Schema } from 'mongoose'
import { BuiltInProviderType } from 'next-auth/providers'

const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 10

export interface UserSchemaInterface {
   _id?: Schema.Types.ObjectId
   fullName: string
   email: string
   password: string
   provider: BuiltInProviderType
   providerAccountId: string | null
   isActive: boolean
   createdAt: Date
}

const userSchema = new Schema<UserSchemaInterface>({
   fullName: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   provider: {
      type: String,
      default: 'credentials'
   },
   providerAccountId: {
      type: String
   },
   isActive: {
      type: Boolean,
      required: true,
      default: true
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
})

userSchema.pre(['save', 'updateOne'], async function (next) {
   const fullName = this.get('fullName')
   const password = this.get('password')

   if (fullName) this.set('fullName', titleCase(fullName))

   if (password) {
      await bcrypt
         .genSalt(SALT_WORK_FACTOR)
         .then((salt: string) => {
            return bcrypt.hash(password, salt)
         })
         .then((hash: string) => {
            this.set('password', hash)
         })
         .catch((error: Error) => {
            errorLogger(error)
         })
   }

   return next()
})

userSchema.methods.verifyPassword = function (a: string) {
   return new Promise((resolve, reject) => {
      bcrypt.compare(a, this.password, function (error: any, isMatch: any) {
         if (error) return reject(error)

         resolve(isMatch)
      })
   })
}

if (env.private.APP_ENV !== 'production') delete models.user

const userModel = models.user || model('user', userSchema)

export default userModel
