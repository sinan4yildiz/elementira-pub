import { GraphicProviderType, GraphicSearchResultsType } from '@lib/graphics/types'
import { encodeStr, errorHandler, paramVal, parseDOM } from '@lib/utils'

const DreamsTime: GraphicProviderType = {
   name: 'DreamsTime',
   baseUrl: 'https://www.dreamstime.com',
   method: 'GET',
   active: true,
   headers: {
      Accept: 'text/html'
   },
   params: {
      sort: {
         newest: '8',
         popular: '6'
      },
      type: {
         vectors: undefined,
         illustrations: undefined
      },
      orientation: {
         horizontal: undefined,
         vertical: undefined,
         square: undefined,
         panoramic: undefined
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
      const DOM = parseDOM(source)

      const searchResults: GraphicSearchResultsType = {
         provider: this.name as never,
         meta: {
            currentPage: 0,
            totalAssets: 0
         },
         assets: []
      }

      try {
         const currentPage = DOM.querySelector('.dt-selected input')?.getAttribute('value'),
            totalAssets = DOM.querySelector('h1')?.innerHTML.split(' ')[0].replace(/\D/g, '')

         searchResults.meta = {
            currentPage: currentPage ? parseInt(currentPage) : 0,
            totalAssets: totalAssets ? parseInt(totalAssets) : 0
         }

         DOM.querySelectorAll(`.item-slide`).forEach(asset => {
            const link = asset.querySelector('a[data-status]'),
               image = asset.querySelector('img')

            const assetUrl = link?.getAttribute('href'),
               thumbnailUrl = image?.getAttribute('data-src'),
               title = image?.getAttribute('alt') ?? undefined

            if (assetUrl && thumbnailUrl) {
               searchResults.assets.push({
                  id: encodeStr(assetUrl),
                  assetUrl: assetUrl,
                  thumbnailUrl: thumbnailUrl,
                  title: title,
                  downloadUrl: undefined,
                  premium: true,
                  provider: this.name as never
               })
            }
         })
      } catch (error: any) {
         errorHandler(new Error(error))
      }

      return searchResults
   },
   searchUrl: function (params) {
      let path = `/search.php`

      const queryParams = new URLSearchParams(),
         validParams: any = {
            srh_field: params.keyword,
            sortcriteria: paramVal(this.params.sort, params.sort),
            s_color1: paramVal(this.params.color, params.color), // color
            s_percent1: paramVal(this.params.color, params.color) ? 20 : undefined, // color density
            s_c1e: paramVal(this.params.color, params.color) ? 'y' : undefined, // color primary
            s_il: params.type === 'illustrations' ? 'y' : undefined, // illustrations
            s_ad: params.type === 'vectors' ? 'y' : undefined, // illustrations
            s_orl: params.orientation === 'horizontal' ? 'y' : undefined, // horizontal
            s_orp: params.orientation === 'vertical' ? 'y' : undefined, // vertical
            s_ors: params.orientation === 'square' ? 'y' : undefined, // square
            s_orw: params.orientation === 'panoramic' ? 'y' : undefined, // panoramic
            s_rsf: '0', // size min
            s_rst: '7', // size max
            s_exc: params.exclude,
            pg: params.page
         }

      for (const param in validParams) {
         const value = validParams[param]

         if (value) queryParams.set(param, value)
      }

      return `${this.baseUrl}${path}?${queryParams.toString()}`
   }
}

export default DreamsTime
