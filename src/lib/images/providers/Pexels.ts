import { env } from '@constants/index'
import { ImageProviderType, ImageSearchResultsType } from '@lib/images/types'
import { encodeStr, errorHandler, paramVal } from '@lib/utils'

const Pexels: ImageProviderType = {
   name: 'Pexels',
   baseUrl: 'https://www.pexels.com',
   apiUrl: 'https://api.pexels.com',
   method: 'GET',
   active: true,
   json: true,
   headers: {
      Accept: 'application/json'
   },
   params: {
      sort: {
         newest: undefined
      },
      orientation: {
         horizontal: 'landscape',
         vertical: 'portrait',
         square: 'square'
      },
      color: {
         red: 'red',
         orange: 'orange',
         yellow: 'yellow',
         green: 'green',
         teal: 'turquoise',
         blue: 'blue',
         purple: 'violet',
         magenta: 'pink',
         brown: 'brown',
         black: 'black',
         white: 'white'
      },
      licence: {
         free: undefined
      }
   },
   searchResults: function (source, searchQuery) {
      const searchResults: ImageSearchResultsType = {
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
            totalAssets: data.total_results
         }

         data.photos.forEach((asset: any) => {
            searchResults.assets.push({
               id: encodeStr(asset.id),
               assetUrl: asset.url,
               thumbnailUrl: asset.src.large,
               title: asset.alt,
               downloadUrl: undefined,
               contributor: asset.photographer,
               contributorUrl: asset.photographer_url,
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
      let path = `/v1/search`

      const queryParams = new URLSearchParams(),
         validParams: any = {
            query: params.keyword || 'photo',
            color: paramVal(this.params.color, params.color),
            orientation: paramVal(this.params.orientation, params.orientation),
            page: params.page,
            per_page: params.limit || 80
         }

      for (const param in validParams) {
         const value = validParams[param]

         if (value) queryParams.set(param, value)
      }

      // Locale
      queryParams.set('locale', 'en-US')

      // Authorization
      this.headers.Authorization = env.private.PEXELS_API_KEY

      return `${this.apiUrl}${path}?${queryParams.toString()}`
   }
}

export default Pexels
