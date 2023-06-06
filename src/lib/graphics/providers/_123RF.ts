import { GraphicProviderType, GraphicSearchResultsType } from '@lib/graphics/types'
import { encodeStr, errorHandler, paramVal } from '@lib/utils'

const _123RF: GraphicProviderType = {
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
         newest: '2'
      },
      type: {
         vectors: '2',
         illustrations: '2'
      },
      orientation: {
         horizontal: '1',
         vertical: '2',
         square: '3',
         panoramic: '4'
      },
      color: {
         white: '0',
         black: '1',
         yellow: '27',
         orange: '10',
         red: '17',
         purple: '12',
         magenta: '25',
         green: '28',
         teal: '21',
         blue: '14'
      },
      licence: {
         premium: undefined
      },
      exclude: undefined
   },
   searchResults: function (source) {
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
            currentPage: data.meta.page,
            totalAssets: data.meta.total
         }

         data.data.forEach((asset: any) => {
            searchResults.assets.push({
               id: encodeStr(asset.attributes.detail_url),
               assetUrl: this.baseUrl + asset.attributes.detail_url,
               thumbnailUrl: asset.attributes.thumbnail_url,
               title: asset.attributes.description,
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
      let path = `/apicore/search`

      const queryParams = new URLSearchParams(),
         validParams: any = {
            type: 1,
            word: params.keyword || 'illustration',
            imgtype: paramVal(this.params.type, params.type),
            orientation: paramVal(this.params.orientation, params.orientation),
            color: paramVal(this.params.color, params.color),
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
