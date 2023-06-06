import { env } from '@constants/index'
import { ImageProviderType, ImageSearchResultsType } from '@lib/images/types'
import { encodeStr, errorHandler, paramVal } from '@lib/utils'

const Pixabay: ImageProviderType = {
   name: 'Pixabay',
   baseUrl: 'https://www.pixabay.com',
   apiUrl: 'https://www.pixabay.com/api',
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
      orientation: {
         horizontal: 'horizontal',
         vertical: 'vertical'
      },
      color: {
         red: 'red',
         orange: 'orange',
         yellow: 'yellow',
         green: 'green',
         teal: 'turquoise',
         blue: 'blue',
         magenta: 'pink',
         brown: 'brown',
         black: 'black',
         white: 'white'
      },
      style: {
         transparent: undefined
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
            totalAssets: data.total
         }

         data.hits.forEach((asset: any) => {
            searchResults.assets.push({
               id: encodeStr(asset.id),
               assetUrl: asset.pageURL,
               thumbnailUrl: asset.webformatURL,
               title: asset.tags,
               downloadUrl: undefined,
               contributor: undefined,
               contributorUrl: undefined,
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
            colors: paramVal(this.params.color, params.color),
            orientation: paramVal(this.params.orientation, params.orientation),
            safesearch: paramVal(this.params.safeSearch, params.safeSearch),
            order: paramVal(this.params.sort, params.sort),
            image_type: 'photo',
            page: params.page,
            per_page: params.limit || 80
         }

      for (const param in validParams) {
         const value = validParams[param]

         if (value) queryParams.set(param, value)
      }

      // Transparent
      if (params.style === 'transparent') queryParams.set('colors', 'transparent')

      // Locale
      queryParams.set('locale', 'en')

      // API key
      queryParams.set('key', env.private.PIXABAY_API_KEY as string)

      return `${this.apiUrl}?${queryParams.toString()}`
   }
}

export default Pixabay
