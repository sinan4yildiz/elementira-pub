import { GraphicProviderType, GraphicSearchResultsType } from '@lib/graphics/types'
import { encodeStr, errorHandler, paramVal, parseDOM } from '@lib/utils'

const Freepik: GraphicProviderType = {
   name: 'Freepik',
   baseUrl: 'https://www.freepik.com',
   method: 'GET',
   active: true,
   headers: {
      Accept: 'text/html'
   },
   params: {
      sort: {
         newest: 'recent'
      },
      type: {
         vectors: 'vector',
         illustrations: 'psd'
      },
      orientation: {
         horizontal: 'landscape',
         vertical: 'portrait',
         square: 'square',
         panoramic: 'panoramic'
      },
      color: {
         white: 'white',
         black: 'black',
         yellow: 'yellow',
         orange: 'orange',
         red: 'red',
         purple: 'purple',
         magenta: 'pink',
         green: 'green',
         teal: 'cyan',
         blue: 'blue'
      },
      licence: {
         free: undefined,
         premium: undefined
      }
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
         const currentPage = DOM.querySelector('[name="page"]')?.getAttribute('value'),
            totalAssets = DOM.querySelector('#main')?.getAttribute('data-summary-total')

         searchResults.meta = {
            currentPage: currentPage ? parseInt(currentPage) : 0,
            totalAssets: totalAssets ? parseInt(totalAssets) : 0
         }

         DOM.querySelectorAll(`.showcase__item`).forEach(asset => {
            const link = asset.querySelector(`.showcase__link`),
               image = link?.querySelector(`:scope > img`)

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
                  premium: !!asset.querySelector('.icon--premium'),
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
      let path = `/search`

      const queryParams = new URLSearchParams(),
         validParams: any = {
            query: params.keyword,
            format: 'search',
            type: paramVal(this.params.type, params.type),
            color: paramVal(this.params.color, params.color),
            orientation: paramVal(this.params.orientation, params.orientation),
            demographic: [],
            order_by: paramVal(this.params.sort, params.sort),
            page: params.page
         }

      for (const param in validParams) {
         const value = validParams[param]

         if (value) queryParams.set(param, value)
      }

      // Licence
      switch (params.licence) {
         case 'free':
            queryParams.set('selection', '1')
            break

         case 'premium':
            queryParams.set('premium', '1')
      }

      return `${this.baseUrl}${path}?${queryParams.toString()}`
   }
}

export default Freepik
