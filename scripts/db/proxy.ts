require('@scripts/init')

import { ProxySchemaInterface } from '@models/proxyModel'
import { ProxyRepository } from '@repository/index'

type ProxyMethodsType = {
   create: () => any
}

const proxyMethods: ProxyMethodsType = {
   create: async () => {
      const data: ProxySchemaInterface = JSON.parse(process.argv[3])

      const proxyRepo = new ProxyRepository()

      const exists = await proxyRepo.find({ provider: data.provider })

      if (exists) {
         return console.error('Already exists.')
      }

      const created = await proxyRepo.create(data)

      console.info(created)
   }
}

const method = process.argv[2] as keyof ProxyMethodsType

if (method) {
   proxyMethods[method]().then(() => {
      process.exit()
   })
}

export { proxyMethods }
