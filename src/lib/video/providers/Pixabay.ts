import { env } from '@constants/index'
import { encodeStr, errorHandler, paramVal, resolutionName } from '@lib/utils'
import { VideoProviderType, VideoSearchResultsType } from '@lib/video/types'

const Pixabay: VideoProviderType = {
   name: 'Pixabay',
   baseUrl: 'https://www.pixabay.com',
   apiUrl: 'https://www.pixabay.com/api/videos',
   method: 'GET',
   active: true,
   json: true,
   headers: {
      Accept: 'application/json'
   },
   params: {
      sort: {
         newest: 'latest',
         popular: 'popular',
         editorsChoice: 'ec'
      },
      resolution: {
         '4K': undefined,
         HD: undefined
      },
      licence: {
         free: undefined
      },
      safeSearch: {
         true: 'true',
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
            totalAssets: data.total
         }

         data.hits.forEach((asset: any) => {
            searchResults.assets.push({
               id: encodeStr(asset.id),
               assetUrl: asset.pageURL,
               description: asset.tags,
               previewUrl: asset.videos.tiny.url,
               previewFormat: 'mp4',
               thumbnailUrl: `https://i.vimeocdn.com/video/${asset.picture_id}.jpg`,
               duration: asset.duration,
               resolution: resolutionName(asset.videos.large.width, asset.videos.large.height),
               downloadUrl: undefined,
               premium: false,
               provider: this.name as never
            })
         })
      } catch (error: any) {
         errorHandler(new Error(error))
      }

      return searchResults
   },
   searchUrl: function (params) {
      const queryParams = new URLSearchParams(),
         validParams: any = {
            q: params.keyword,
            orientation: paramVal(this.params.orientation, params.orientation),
            safesearch: paramVal(this.params.safeSearch, params.safeSearch),
            order: paramVal(this.params.sort, params.sort),
            image_type: 'video',
            page: params.page,
            per_page: params.limit || 80
         }

      for (const param in validParams) {
         const value = validParams[param]

         if (value) queryParams.set(param, value)
      }

      // Resolution
      if (params.resolution?.length) {
         switch (params.resolution[0]) {
            case '4K':
               queryParams.set('min_width', '3800')
               queryParams.set('min_height', '2100')
               break

            case 'HD':
               queryParams.set('min_width', '1900')
               queryParams.set('min_height', '1000')
               break
         }
      }

      // Locale
      queryParams.set('locale', 'en')

      // API key
      queryParams.set('key', env.private.PIXABAY_API_KEY as string)

      return `${this.apiUrl}?${queryParams.toString()}`
   }
}

export default Pixabay
