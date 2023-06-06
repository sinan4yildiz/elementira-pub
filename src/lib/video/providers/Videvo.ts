import { env } from '@constants/index'
import { encodeStr, errorHandler, isTrue, paramVal, resolutionName, toSeconds } from '@lib/utils'
import { VideoProviderType, VideoSearchResultsType } from '@lib/video/types'

const Videvo: VideoProviderType = {
   name: 'Videvo',
   baseUrl: 'https://resources.videvo.net',
   method: 'GET',
   active: true,
   json: true,
   headers: {
      Accept: 'application/json'
   },
   params: {
      sort: {
         popular: undefined,
         newest: 'latest',
         relevant: 'relevant',
         random: 'random'
      },
      resolution: {
         '4K': '4k',
         SD: 'standard_definition',
         HD: 'high_definition'
      },
      minDuration: undefined,
      maxDuration: undefined,
      licence: {
         free: 'free',
         premium: 'premium'
      },
      safeSearch: {
         true: undefined,
         false: 'false'
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
            totalAssets: data.total_rows
         }

         data.results.forEach((asset: any) => {
            searchResults.assets.push({
               id: encodeStr(asset._source.id),
               assetUrl: decodeURIComponent(asset._source.details_page),
               description: asset._source.title,
               previewUrl: asset._source.small_preview_mp4,
               previewFormat: 'mp4',
               thumbnailUrl: asset._source.thumbnail,
               duration: toSeconds(asset._source.duration),
               resolution: resolutionName(asset._source.frame?.split('x')[0], asset._source.frame?.split('x')[1]),
               downloadUrl: undefined,
               premium: isTrue(asset._source.is_premium),
               provider: this.name as never
            })
         })
      } catch (error: any) {
         errorHandler(new Error(error))
      }

      return searchResults
   },
   searchUrl: function (params) {
      let path = `/api/videos`

      const queryParams = new URLSearchParams(),
         validParams: any = {
            query: params.keyword,
            clips_show: paramVal(this.params.licence, params.licence),
            resolution: paramVal(this.params.resolution, params.resolution),
            min_duration: params.minDuration,
            max_duration: params.maxDuration,
            safesearch: paramVal(this.params.safeSearch, params.safeSearch),
            order: paramVal(this.params.sort, params.sort),
            page: params.page
         }

      for (const param in validParams) {
         const value = validParams[param]

         switch (typeof value) {
            case 'object':
               for (const multiple of value) queryParams.set(param, multiple)
               break

            case 'string':
               queryParams.set(param, value)
               break

            case 'number':
               queryParams.set(param, value.toString())
         }
      }

      // API Key
      queryParams.set('key', env.private.VIDEVO_API_KEY || '')

      // Language
      queryParams.set('lang', 'en')

      return `${this.baseUrl}${path}?${queryParams.toString()}`
   }
}

export default Videvo
