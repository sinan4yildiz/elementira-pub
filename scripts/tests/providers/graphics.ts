require('@scripts/init')

import { graphicProviders } from '@lib/graphics'
import { errorLogger } from '@lib/serverUtils'
import FeederService from '@services/feederService'

const providers = Object.entries(graphicProviders).filter(([name]) => {
   if (process.argv[3]) return process.argv[3]?.split(',')?.includes(name)

   return true
})

const graphicProvidersTest = () => {
   return providers.map(async ([name, provider]) => {
      const feederService = new FeederService({
         provider: provider,
         searchQuery: {
            keyword: 'vector'
         }
      })

      try {
         const results = await feederService.searchResults()

         if (results.assets.length < 5) {
            throw Error('No assets found')
         }

         console.info(`- ${name} passed.`)
      } catch (error: any) {
         console.error(`- ${name} failed.`)

         error.context = name
         error.name = 'ProviderError'
         error.path = feederService.searchUrl

         await errorLogger(error)
      }
   })
}

if (process.argv[2] === 'run') {
   Promise.all(graphicProvidersTest()).then(() => {
      process.exit()
   })
}

export { graphicProvidersTest }
