import { SearchQueryObjectType } from '@services/searchService/types'

const alwaysUppercase: string[] = ['3d', 'sd', 'hd', '4k']

const searchQueueIgnoredParams: (keyof SearchQueryObjectType)[] = [
   'keyword',
   // 'sort',
   'page',
   'limit',
   'assetType',
   'providers'
]

const searchQueryPersistentParams: (keyof SearchQueryObjectType)[] = ['keyword', 'sort', 'assetType', 'providers']

const search = {
   assetsPerPage: 100
}

const config = {
   search: search,
   alwaysUppercase: alwaysUppercase,
   searchQueueIgnoredParams: searchQueueIgnoredParams,
   searchQueryPersistentParams: searchQueryPersistentParams
}

export default config
