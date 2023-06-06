import { app } from '@constants/index'
import { SoundEffectMultipleSearchQueriesType } from '@cypress/e2e/types'
import '@cypress/support/stubs'
import { soundEffectProviders } from '@lib/soundEffects'
import { SearchService } from '@services/index'
import { SearchQueryObjectType } from '@services/searchService/types'

const searchQueries: SoundEffectMultipleSearchQueriesType = {
   onlyKeywordQuery: {
      keyword: 'landscape'
   }
}

console.clear()

for (const provider in soundEffectProviders) {
   context(provider, () => {
      for (const searchQuery in searchQueries) {
         const searchService = new SearchService({
            assetType: 'soundEffects',
            searchQuery: searchQueries[searchQuery] as SearchQueryObjectType
         })

         describe(searchQuery, () => {
            it('tests search', () => {
               searchService.provider = app.providers.soundEffects[provider as never]

               cy.visit(searchService.searchPageUrl(true))

               cy.expectSearchResults().wait(500)
            })
         })
      }
   })
}
