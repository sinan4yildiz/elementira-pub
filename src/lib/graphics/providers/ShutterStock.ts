import { GraphicProviderType, GraphicSearchResultsType } from '@lib/graphics/types'
import { encodeStr, errorHandler, paramVal } from '@lib/utils'

const ShutterStock: GraphicProviderType = {
   name: 'ShutterStock',
   baseUrl: 'https://www.shutterstock.com',
   method: 'GET',
   active: true,
   json: true,
   headers: {
      Accept: 'application/json'
   },
   params: {
      sort: {
         popular: undefined,
         newest: 'newest',
         relevant: 'relevant',
         random: 'random'
      },
      type: {
         vectors: 'vector',
         illustrations: 'illustration'
      },
      orientation: {
         horizontal: 'horizontal',
         vertical: 'vertical'
      },
      color: {
         white: 'FFFFFF',
         black: '000000',
         yellow: 'F1F129',
         orange: 'F48700',
         red: 'E72525',
         purple: '7F00FF',
         magenta: 'EA06B1',
         green: '06D506',
         teal: '0ECB9B',
         blue: '1F55F8'
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
         const data = source.pageProps

         searchResults.meta = {
            currentPage: data.meta.pagination.pageNumber,
            totalAssets: data.meta.pagination.totalRecords
         }

         data.assets.forEach((asset: any) => {
            searchResults.assets.push({
               id: encodeStr(asset.link),
               assetUrl: this.baseUrl + asset.link,
               thumbnailUrl: asset.displays['600W'].src,
               title: asset.alt,
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
      let path = `/_next/data/XDH1eJTLkmLwt9S0_KfwF/en/_shutterstock/search.json`

      const queryParams = new URLSearchParams(),
         validParams: any = {
            term: params.keyword,
            image_type: paramVal(this.params.type, params.type),
            orientation: paramVal(this.params.orientation, params.orientation),
            color: paramVal(this.params.color, params.color),
            exclude: params.exclude,
            sort: paramVal(this.params.sort, params.sort),
            page: params.page
         }

      for (const param in validParams) {
         const value = validParams[param]

         switch (typeof value) {
            case 'object':
               for (const multiple of value) queryParams.append(param, multiple)
               break

            case 'string':
               queryParams.set(param, value)
               break

            case 'number':
               queryParams.set(param, value.toString())
         }
      }

      return `${this.baseUrl}${path}?${queryParams.toString()}`
   }
}

export default ShutterStock
