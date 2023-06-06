import { RelatedKeywordsProviderType, RelatedKeywordsResultsType } from '@lib/types'

const soundEffectRelatedKeywords: RelatedKeywordsProviderType = {
   name: 'Unsplash',
   baseUrl: 'https://unsplash.com/napi/search',
   method: 'GET',
   headers: {
      Accept: 'application/json'
   },
   searchUrl: function (params) {
      const queryParams = new URLSearchParams()

      queryParams.set('query', params.keyword || 'a')

      return `${this.baseUrl}?${queryParams.toString()}`
   },
   results: function (source) {
      const results: RelatedKeywordsResultsType = []

      for (const keyword of source.related_searches || []) {
         results.push({ keyword: keyword.title.toLowerCase() })
      }

      return results
   }
}

export default soundEffectRelatedKeywords
