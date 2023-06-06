import { ImageProviderType, ImageSearchResultsType } from '@lib/images/types'
import { encodeStr, errorHandler, paramVal } from '@lib/utils'

const Unsplash: ImageProviderType = {
   name: 'Unsplash',
   baseUrl: 'https://unsplash.com',
   method: 'GET',
   active: true,
   json: true,
   headers: {
      Accept: 'application/json'
   },
   params: {
      sort: {
         newest: 'latest'
      },
      orientation: {
         horizontal: 'landscape',
         vertical: 'portrait'
      },
      mood: {
         blackWhite: undefined
      },
      color: {
         white: 'white',
         black: 'black',
         yellow: 'yellow',
         orange: 'orange',
         red: 'red',
         purple: 'purple',
         magenta: 'magenta',
         green: 'green',
         teal: 'teal',
         blue: 'blue'
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
            totalAssets: data.total
         }

         data.results.forEach((asset: any) => {
            if (!asset.plus) {
               searchResults.assets.push({
                  id: encodeStr(asset.links.html),
                  assetUrl: asset.links.html,
                  thumbnailUrl: asset.urls.small,
                  title: asset.alt_description,
                  contributor: undefined,
                  contributorUrl: undefined,
                  downloadUrl: asset.plus ? undefined : `${asset.links.download}&force=true`,
                  premium: asset.plus,
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
      let path = `/napi/search/photos`

      const queryParams = new URLSearchParams(),
         validParams: any = {
            query: params.keyword || 'photo',
            color: paramVal(this.params.color, params.color),
            orientation: paramVal(this.params.orientation, params.orientation),
            order_by: paramVal(this.params.sort, params.sort),
            page: params.page,
            per_page: params.limit || 30
         }

      for (const param in validParams) {
         const value = validParams[param]

         if (value) queryParams.set(param, value)
      }

      // Black & white
      if (params.mood === 'blackWhite') {
         queryParams.set('color', 'black_and_white')
      }

      return `${this.baseUrl}${path}?${queryParams.toString()}`
   }
}

export default Unsplash
