import { routes } from '@constants/index'
import { fetcher, route } from '@lib/utils'
import { RelatedKeywordServiceInterface, RelatedKeywordsParamsType } from '@services/relatedKeywordService/types'

class RelatedKeywordService implements RelatedKeywordServiceInterface {
   async results(searchQuery: RelatedKeywordsParamsType) {
      return await fetcher({
         url: route({ path: routes.api.search.relatedKeywords.path }),
         method: routes.api.search.relatedKeywords.method,
         data: searchQuery
      })
   }
}

export default RelatedKeywordService
