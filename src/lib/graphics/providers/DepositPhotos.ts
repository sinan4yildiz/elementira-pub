import { env } from '@constants/index'
import { GraphicProviderType, GraphicSearchResultsType } from '@lib/graphics/types'
import { encodeStr, errorHandler, paramVal } from '@lib/utils'

const DepositPhotos: GraphicProviderType = {
   name: 'DepositPhotos',
   baseUrl: 'https://depositphotos.com',
   apiUrl: 'https://api.depositphotos.com',
   method: 'GET',
   active: true,
   json: true,
   headers: {
      Accept: 'application/json'
   },
   params: {
      sort: {
         relevant: '1',
         popular: '4',
         newest: '5',
         random: '6'
      },
      orientation: {
         horizontal: 'horizontal',
         vertical: 'vertical',
         square: 'square'
      },
      color: {
         red: '#fe0000',
         orange: '#f9be00',
         yellow: '#ffff00',
         green: '#027f00',
         teal: '#0d9488',
         blue: '#0005fd',
         purple: '#9333ea',
         magenta: '#ff01ff',
         black: '#000000',
         white: '#ffffff'
      },
      licence: {
         premium: undefined
      },
      exclude: undefined
   },
   searchResults: function (source, searchQuery) {
      const searchResults: GraphicSearchResultsType = {
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
            totalAssets: data.count
         }

         data.result.forEach((asset: any) => {
            searchResults.assets.push({
               id: encodeStr(asset.id),
               assetUrl: asset.itemurl,
               thumbnailUrl: asset.huge_thumb,
               title: asset.title,
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
      let path = `/`

      const queryParams = new URLSearchParams(),
         validParams: any = {
            dp_search_query: params.keyword || 'vector',
            dp_search_color: paramVal(this.params.color, params.color),
            dp_search_orientation: paramVal(this.params.orientation, params.orientation),
            dp_search_sort: paramVal(this.params.sort, params.sort),
            dp_search_photo: 'false',
            dp_search_video: 'false',
            dp_exclude_keywords: params.exclude,
            dp_search_offset: (params.page || 0) * 100,
            per_page: params.limit || 100
         }

      for (const param in validParams) {
         const value = validParams[param]

         if (value) queryParams.set(param, value)
      }

      // Locale
      queryParams.set('dp_lang', 'en')

      // Command
      queryParams.set('dp_command', 'search')

      // API key
      queryParams.set('dp_apikey', env.private.DEPOSITPHOTOS_API_KEY as string)

      return `${this.apiUrl}${path}?${queryParams.toString()}`
   }
}

export default DepositPhotos
