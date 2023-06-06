import { app } from '@constants/index'
import { GraphicMultipleSearchQueriesType } from '@cypress/e2e/types'
import '@cypress/support/stubs'
import { graphicProviders } from '@lib/graphics'
import { SearchService } from '@services/index'
import { SearchQueryObjectType } from '@services/searchService/types'

const searchQueries: GraphicMultipleSearchQueriesType = {
   onlyKeywordQuery: {
      keyword: 'landscape'
   }
}

console.clear()

for (const provider in graphicProviders) {
   context(provider, () => {
      for (const searchQuery in searchQueries) {
         const searchService = new SearchService({
            assetType: 'graphics',
            searchQuery: searchQueries[searchQuery] as SearchQueryObjectType
         })

         describe(searchQuery, () => {
            it('tests search', () => {
               searchService.provider = app.providers.graphics[provider as never]

               cy.visit(searchService.searchPageUrl(true))

               cy.expectSearchResults().wait(500)
            })
         })
      }
   })
}
