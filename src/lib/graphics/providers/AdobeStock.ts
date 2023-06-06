import { GraphicProviderType, GraphicSearchResultsType } from '@lib/graphics/types'
import { encodeStr, errorHandler, paramVal } from '@lib/utils'

const AdobeStock: GraphicProviderType = {
   name: 'AdobeStock',
   baseUrl: 'https://stock.adobe.com/uk',
   method: 'GET',
   active: true,
   json: true,
   headers: {
      Accept: 'application/json'
   },
   params: {
      sort: {
         newest: 'creation',
         popular: 'nb_downloads',
         editorsChoice: 'featured'
      },
      type: {
         vectors: undefined,
         illustrations: undefined
      },
      orientation: {
         horizontal: 'horizontal',
         vertical: 'vertical',
         square: 'square',
         panoramic: 'panoramic'
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
      }
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
            currentPage: data.search_page,
            totalAssets: data.total
         }

         for (const item in data.items) {
            const asset = data.items[item]

            searchResults.assets.push({
               id: encodeStr(asset.content_url),
               assetUrl: asset.content_url,
               thumbnailUrl: asset.content_thumb_large_url,
               title: asset.title,
               downloadUrl: undefined,
               premium: true,
               provider: this.name as never
            })
         }
      } catch (error: any) {
         errorHandler(new Error(error))
      }

      return searchResults
   },
   searchUrl: function (params) {
      let path = `/Ajax/Search`

      const queryParams = new URLSearchParams(),
         validParams: any = {
            k: params.keyword,
            'filters[content_type:image]': '1',
            'filters[orientation]': paramVal(this.params.orientation, params.orientation),
            color: paramVal(this.params.color, params.color),
            order: paramVal(this.params.sort, params.sort),
            limit: params.limit,
            search_page: params.page
         }

      for (const param in validParams) {
         const value = validParams[param]

         if (value) queryParams.set(param, value)
      }

      // Image type
      switch (params.type) {
         case 'illustrations':
            queryParams.set('filters[content_type:illustration]', '1')
            break
         case 'vectors':
            queryParams.set('filters[content_type:zip_vector]', '1')
            break
      }

      return `${this.baseUrl}${path}?${queryParams.toString()}`
   }
}

export default AdobeStock
