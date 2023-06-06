import { arrayUnique, encodeStr, errorHandler, formatDuration, paramVal, resolutionName } from '@lib/utils'
import { VideoProviderType, VideoSearchResultsType } from '@lib/video/types'

const EnvatoVideo: VideoProviderType = {
   name: 'EnvatoVideo',
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
      resolution: {
         '4K': '4k-(uhd)',
         HD: '1080p-(full-hd)+2k',
         SD: '720p-(hd)'
      },
      fps: {
         '23.98': '2398-fps',
         '24': '24-fps',
         '25': '25-fps',
         '29.97': '2997-fps',
         '30': '30-fps',
         '50': '50-fps',
         '59': '60-fps',
         '60': '60-fps'
      },
      minDuration: undefined,
      maxDuration: undefined,
      licence: {
         premium: undefined
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
         const data = source.data

         searchResults.meta = {
            currentPage: searchQuery?.page || 1,
            totalAssets: data.totalItems
         }

         data.items.forEach((asset: any) => {
            searchResults.assets.push({
               id: encodeStr(asset.id.toString()),
               assetUrl: `${this.baseUrl}/${asset.slug}-${asset.id}`,
               description: asset.title,
               previewUrl: asset.coverVideo.standard,
               previewFormat: 'mp4',
               thumbnailUrl: asset.coverImage.w600,
               duration: asset.itemAttributes.videoLength[0],
               resolution: resolutionName(
                  asset.itemAttributes.videoResolution.width,
                  asset.itemAttributes.videoResolution.height
               ),
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
         pathParams = ['/stock-video', params.keyword]

      if (params.sort) {
         pathParams.push(paramVal(this.params.sort, params.sort))
      }

      if (params.resolution) {
         pathParams.push(`resolution-${paramVal(this.params.resolution, params.resolution).join('+')}`)
      }

      if (params.fps) {
         pathParams.push(`frame-rate-${paramVal(this.params.fps, params.fps[0])}`)
      }

      if (params.minDuration) {
         pathParams.push(`min-length-${formatDuration(params.minDuration)}`)
      }

      if (params.maxDuration) {
         pathParams.push(`max-length-${formatDuration(params.maxDuration)}`)
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

export default EnvatoVideo
