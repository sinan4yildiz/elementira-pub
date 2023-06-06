require('@scripts/init')

import { UserSchemaInterface } from '@models/userModel'
import { UserRepository } from '@repository/index'

type UserMethodsType = {
   create: () => any
   deleteTestUsers: () => any
}

const userMethods: UserMethodsType = {
   create: async () => {
      const data: UserSchemaInterface = JSON.parse(process.argv[3])

      const userRepo = new UserRepository()

      const exists = await userRepo.find({ email: data.email })

      if (exists) {
         return console.error('Already exists.')
      }

      const created = await userRepo.create(data)

      console.info(created)
   },
   deleteTestUsers: async () => {
      const userRepo = new UserRepository()

      const deleted = await userRepo.delete({ email: { $in: [/^(.*)@test.com/i, 'contact@elementira.com'] } })

      console.log(deleted)
   }
}

const method = process.argv[2] as keyof UserMethodsType

if (method) {
   userMethods[method]().then(() => {
      process.exit()
   })
}

export { userMethods }
