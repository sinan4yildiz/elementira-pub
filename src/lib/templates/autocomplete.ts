import { AutocompleteProviderType, AutocompleteResultsType } from '@lib/types'

const templateAutocomplete: AutocompleteProviderType = {
   name: 'Envato',
   baseUrl: 'https://autosuggest.aws.elements.envato.com/',
   method: 'GET',
   headers: {
      Accept: 'application/json'
   },
   searchUrl: function (params) {
      const queryParams = new URLSearchParams()

      queryParams.set('itemType', 'graphic-templates')
      queryParams.set('keyword', params.keyword)

      return `${this.baseUrl}?${queryParams.toString()}`
   },
   results: function (source) {
      const results: AutocompleteResultsType = []

      for (const item of source as any) {
         results.push({ keyword: item.term.toLowerCase() })
      }

      return results
   }
}

export default templateAutocomplete
