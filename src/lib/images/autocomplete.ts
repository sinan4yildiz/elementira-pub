import { AutocompleteProviderType, AutocompleteResultsType } from '@lib/types'

const imageAutocomplete: AutocompleteProviderType = {
   name: 'ShutterStock',
   baseUrl: 'https://www.shutterstock.com/napi/autocomplete',
   method: 'GET',
   headers: {
      Accept: 'application/json'
   },
   searchUrl: function (params) {
      const queryParams = new URLSearchParams()

      queryParams.set('pageSize', '50')
      queryParams.set('mediaType', 'image')
      queryParams.set('language', 'en')
      queryParams.set('q', params.keyword)

      return `${this.baseUrl}?${queryParams.toString()}`
   },
   results: function (source) {
      const results: AutocompleteResultsType = []

      for (const keyword of source) {
         results.push({ keyword: keyword.toLowerCase() })
      }

      return results
   }
}

export default imageAutocomplete
