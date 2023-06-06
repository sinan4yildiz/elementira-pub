import { routes } from '@constants/index'
import { fetcher, route } from '@lib/utils'
import { AutocompleteParamsType, AutocompleteServiceInterface } from '@services/autocompleteService/types'

class AutocompleteService implements AutocompleteServiceInterface {
   async results(searchQuery: AutocompleteParamsType) {
      return await fetcher({
         url: route({ path: routes.api.search.autocomplete.path }),
         method: routes.api.search.autocomplete.method,
         data: searchQuery
      })
   }
}

export default AutocompleteService
