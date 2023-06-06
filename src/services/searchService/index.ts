import { app, config, routes } from '@constants/index'
import { AnyProviderType } from '@lib/types'
import { fetcher, hasOwnProperties, moveProp, route } from '@lib/utils'
import { SearchQueryObjectType, SearchServiceInterface, SearchServicePropsType } from '@services/searchService/types'

class SearchService implements SearchServiceInterface {
   public readonly props
   public signal: AbortSignal
   public provider: AnyProviderType

   constructor({ assetType, searchQuery }: SearchServicePropsType) {
      this.props = {
         assetType: assetType,
         searchQuery: { ...searchQuery },
         queue: {
            matched: Object.assign({}, app.providers[assetType]),
            unmatched: {}
         }
      }
   }

   get queue() {
      const searchQueue = { ...this.props.queue }
      const ignoredParams: (keyof SearchQueryObjectType)[] = config.searchQueueIgnoredParams
      const matchableParams: SearchQueryObjectType = Object.assign({}, this.props.searchQuery)

      // Delete ignored params
      for (const param of ignoredParams) delete matchableParams[param]

      // Filter matched/unmatched providers
      for (const [param, value] of Object.entries(matchableParams)) {
         for (const [name, provider] of Object.entries(app.providers[this.props.assetType])) {
            if (
               !provider.params.hasOwnProperty(param) ||
               (typeof provider.params[param as never] === 'object' &&
                  !hasOwnProperties(provider.params[param as never], Array.isArray(value) ? value : [value]))
            ) {
               moveProp(searchQueue.matched, searchQueue.unmatched, name as never)
            }
         }
      }

      return searchQueue
   }

   searchPageUrl(host = false) {
      return route({
         path: routes.page.search,
         params: { ...this.props.searchQuery, assetType: this.props.assetType, providers: this.provider.name },
         host: host
      })
   }

   async results() {
      return await fetcher({
         url: route({
            path: routes.api.search.results.path,
            segments: {
               assetType: this.props.assetType,
               provider: this.provider.name
            },
            host: true
         }),
         method: routes.api.search.results.method,
         data: {
            searchQuery: this.props.searchQuery
         },
         signal: this.signal
      })
   }

   async recentSearches(assetType: string) {
      return await fetcher({
         url: route({ path: routes.api.account.searches.recent.path }),
         method: routes.api.account.searches.recent.method,
         data: {
            assetType: assetType
         }
      })
   }

   async clearRecentSearches(assetType: string) {
      return await fetcher({
         url: route({ path: routes.api.account.searches.clear.path }),
         method: routes.api.account.searches.clear.method,
         data: {
            assetType: assetType
         }
      })
   }
}

export default SearchService
