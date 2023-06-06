import { AutocompleteProviderType, AutocompleteResultsType } from '@lib/types'

const graphicAutocomplete: AutocompleteProviderType = {
   name: 'ShutterStock',
   baseUrl: 'https://www.shutterstock.com/studioapi/autocomplete',
   method: 'GET',
   headers: {
      Accept: 'application/json'
   },
   searchUrl: function (params) {
      const queryParams = new URLSearchParams()

      queryParams.set('namespace', 'shutterstock')
      queryParams.set('client_id', 'shutterstock_footage_prod')
      queryParams.set('pageSize', '50')
      queryParams.set('mediaType', 'image')
      queryParams.set('language', 'en')
      queryParams.set('q', params.keyword)

      return `${this.baseUrl}?${queryParams.toString()}`
   },
   results: function (source) {
      const results: AutocompleteResultsType = []

      for (const item of (source as any).meta.autocompletions) {
         results.push({ keyword: item.pattern.toLowerCase() })
      }

      return results
   }
}

export default graphicAutocomplete
