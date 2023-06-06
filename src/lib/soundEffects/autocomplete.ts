import { AutocompleteProviderType, AutocompleteResultsType } from '@lib/types'

const soundEffectAutocomplete: AutocompleteProviderType = {
   name: 'Envato',
   baseUrl: 'https://autosuggest.aws.elements.envato.com/',
   method: 'GET',
   headers: {
      Accept: 'application/json'
   },
   searchUrl: function (params) {
      const queryParams = new URLSearchParams()

      queryParams.set('itemType', 'sound-effects')
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

export default soundEffectAutocomplete
