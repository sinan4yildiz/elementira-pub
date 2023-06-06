import { encodeStr, errorHandler, paramVal, resolutionName } from '@lib/utils'
import { VideoProviderType, VideoSearchResultsType } from '@lib/video/types'

const _123RF: VideoProviderType = {
   name: '_123RF',
   baseUrl: 'https://www.123rf.com',
   method: 'POST',
   active: true,
   json: true,
   headers: {
      Accept: 'application/json'
   },
   params: {
      sort: {
         relevant: undefined,
         newest: '2'
      },
      resolution: {
         '4K': '3',
         HD: '2',
         SD: '1'
      },
      fps: {
         '23.98': 'val23976',
         '24': 'val24',
         '25': 'val25',
         '29.97': 'val2997',
         '30': 'val30',
         '50': 'val50',
         '59': 'val5994',
         '60': 'val60'
      },
      usage: {
         editorial: '2',
         nonEditorial: '1'
      },
      licence: {
         premium: undefined
      },
      exclude: undefined,
      safeSearch: {
         true: undefined,
         false: '0'
      }
   },
   searchResults: function (source, searchQuery) {
      const searchResults: VideoSearchResultsType = {
         provider: this.name as never,
         meta: {
            currentPage: 0,
            totalAssets: 0
         },
         assets: []
      }

      try {
         const data = source

         searchResults.meta = {
            currentPage: searchQuery?.page || 1,
            totalAssets: data.meta.total
         }

         data.data.forEach((asset: any) => {
            searchResults.assets.push({
               id: encodeStr(asset.id.toString()),
               assetUrl: this.baseUrl + asset.attributes.detail_url,
               description: asset.attributes.description,
               previewUrl: asset.attributes.preview_url,
               previewFormat: 'mp4',
               thumbnailUrl: asset.attributes.thumbnail_url,
               duration: Math.ceil(asset.attributes.duration.total_seconds),
               resolution: resolutionName(asset.attributes.width, asset.attributes.height),
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
      let path = `/apicore-footage/search`

      const queryParams = new URLSearchParams(),
         validParams: any = {
            type: 1,
            word: params.keyword || 'photo',
            imgtype: 1,
            size: paramVal(this.params.resolution, params.resolution),
            safe_search: paramVal(this.params.safeSearch, params.safeSearch),
            exclude: params.exclude,
            order_by: paramVal(this.params.sort, params.sort),
            page: params.page
         }

      for (const param in validParams) {
         const value = validParams[param]

         if (value) queryParams.set(param, value)
      }

      return `${this.baseUrl}${path}?${queryParams.toString()}`
   }
}

export default _123RF
