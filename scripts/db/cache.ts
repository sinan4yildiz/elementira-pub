require('@scripts/init')

import { CacheRepository } from '@repository/index'

type CacheMethodsType = {
   purge: () => any
}

const cacheMethods: CacheMethodsType = {
   purge: async () => {
      const cacheRepo = new CacheRepository()

      const date = new Date()

      date.setDate(date.getDate() - 2)

      const stale = await cacheRepo.delete({
         createdAt: { $lt: date }
      })

      console.info(`${stale.deletedCount} record(s) deleted.`)
   }
}

const method = process.argv[2] as keyof CacheMethodsType

if (method) {
   cacheMethods[method]().then(() => {
      process.exit()
   })
}

export { cacheMethods }
