require('@scripts/init')

import { app } from '@constants/index'
import FeederService from '@services/feederService'

const feederService = new FeederService({
   provider: app.providers.templates.CreativeMarket,
   searchQuery: {
      keyword: 'landscape'
   },
   scraper: 'BrightDataUnlocker'
})

feederService.searchResults().then(results => {
   console.info(results)

   process.exit()
})
