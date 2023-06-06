import { app } from '@constants/index'
import { MusicMultipleSearchQueriesType } from '@cypress/e2e/types'
import '@cypress/support/stubs'
import { musicProviders } from '@lib/music'
import { SearchService } from '@services/index'
import { SearchQueryObjectType } from '@services/searchService/types'

const searchQueries: MusicMultipleSearchQueriesType = {
   onlyKeywordQuery: {
      keyword: 'landscape'
   }
}

console.clear()

for (const provider in musicProviders) {
   context(provider, () => {
      for (const searchQuery in searchQueries) {
         const searchService = new SearchService({
            assetType: 'music',
            searchQuery: searchQueries[searchQuery] as SearchQueryObjectType
         })

         describe(searchQuery, () => {
            it('tests search', () => {
               searchService.provider = app.providers.music[provider as never]

               cy.visit(searchService.searchPageUrl(true))

               cy.expectSearchResults().wait(500)
            })
         })
      }
   })
}
