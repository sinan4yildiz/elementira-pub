require('@scripts/init')

import { app } from '@constants/index'
import FeederService from '@services/feederService'

const feederService = new FeederService({
   provider: app.providers.images.GettyImages,
   searchQuery: {
      keyword: 'landscape'
   },
   scraper: 'BrightDataCenter'
})

feederService.searchResults().then(results => {
   console.info(results)

   process.exit()
})
