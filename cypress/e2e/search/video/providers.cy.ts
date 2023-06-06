import { app } from '@constants/index'
import { VideoMultipleSearchQueriesType } from '@cypress/e2e/types'
import '@cypress/support/stubs'
import { videoProviders } from '@lib/video'
import { SearchService } from '@services/index'
import { SearchQueryObjectType } from '@services/searchService/types'

const searchQueries: VideoMultipleSearchQueriesType = {
   onlyKeywordQuery: {
      keyword: 'landscape'
   }
}

console.clear()

for (const provider in videoProviders) {
   context(provider, () => {
      for (const searchQuery in searchQueries) {
         const searchService = new SearchService({
            assetType: 'video',
            searchQuery: searchQueries[searchQuery] as SearchQueryObjectType
         })

         describe(searchQuery, () => {
            it('tests search', () => {
               searchService.provider = app.providers.video[provider as never]

               cy.visit(searchService.searchPageUrl(true))

               cy.expectSearchResults().wait(500)
            })
         })
      }
   })
}
