import { app } from '@constants/index'
import { ImageMultipleSearchQueriesType } from '@cypress/e2e/types'
import '@cypress/support/stubs'
import { imageProviders } from '@lib/images'
import { SearchService } from '@services/index'
import { SearchQueryObjectType } from '@services/searchService/types'

const searchQueries: ImageMultipleSearchQueriesType = {
   onlyKeywordQuery: {
      keyword: 'landscape'
   }
}

console.clear()

for (const provider in imageProviders) {
   context(provider, () => {
      for (const searchQuery in searchQueries) {
         const searchService = new SearchService({
            assetType: 'images',
            searchQuery: searchQueries[searchQuery] as SearchQueryObjectType
         })

         describe(searchQuery, () => {
            it('tests search', () => {
               searchService.provider = app.providers.images[provider as never]

               cy.visit(searchService.searchPageUrl(true))

               cy.expectSearchResults().wait(500)
            })
         })
      }
   })
}
