require('@scripts/init')

import { app } from '@constants/index'
import FeederService from '@services/feederService'

const feederService = new FeederService({
   provider: app.providers.images.iStockPhoto,
   searchQuery: {
      keyword: 'landscape'
   },
   scraper: 'ScrapingBee'
})

feederService.searchResults().then(results => {
   console.info(results)

   process.exit()
})
