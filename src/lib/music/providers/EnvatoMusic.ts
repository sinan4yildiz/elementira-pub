import { MusicProviderType, MusicSearchResultsType } from '@lib/music/types'
import { arrayUnique, encodeStr, errorHandler, paramVal } from '@lib/utils'

const EnvatoMusic: MusicProviderType = {
   name: 'EnvatoMusic',
   baseUrl: 'https://elements.envato.com',
   method: 'GET',
   active: true,
   json: true,
   headers: {
      Accept: 'application/json'
   },
   params: {
      sort: {
         newest: 'sort-by-latest',
         popular: undefined
      },
      licence: {
         premium: undefined
      }
   },
   searchResults: function (source, searchQuery) {
      const searchResults: MusicSearchResultsType = {
         provider: this.name as never,
         meta: {
            currentPage: 0,
            totalAssets: 0
         },
         assets: []
      }

      try {
         const data = source.data

         searchResults.meta = {
            currentPage: searchQuery?.page || 1,
            totalAssets: data.totalItems
         }

         data.items.forEach((asset: any) => {
            searchResults.assets.push({
               id: encodeStr(asset.id.toString()),
               title: asset.title,
               assetUrl: `${this.baseUrl}/${asset.slug}-${asset.id}`,
               previewUrl: asset.previewAudio.split('?')[0],
               duration: asset.itemAttributes.audioLength,
               artist: asset.contributorUsername,
               bpm: asset.itemAttributes.bpm,
               downloadUrl: undefined,
               premium: true,
               provider: this.name as never
            })
         })
      } catch (error: any) {
         errorHandler(new Error(error))
      }

      return searchResults
   },
   searchUrl: function (params) {
      let path = `/data-api/page/items-page`,
         pathParams = ['/audio', params.keyword]

      if (params.sort) {
         pathParams.push(paramVal(this.params.sort, params.sort))
      }

      if (params.page) {
         pathParams.push(`pg-${params.page}`)
      }

      const queryParams = new URLSearchParams(),
         validParams: any = {
            path: encodeURI(arrayUnique(pathParams as []).join('/'))
         }

      for (const param in validParams) {
         const value = validParams[param]

         if (value) queryParams.set(param, value)
      }

      return `${this.baseUrl}${path}?${queryParams.toString()}`
   }
}

export default EnvatoMusic
