import { ImageProviderType, ImageSearchResultsType } from '@lib/images/types'
import { arrayUnique, encodeStr, errorHandler, paramVal } from '@lib/utils'

const EnvatoPhotos: ImageProviderType = {
   name: 'EnvatoPhotos',
   baseUrl: 'https://elements.envato.com',
   method: 'GET',
   active: true,
   json: true,
   headers: {
      Accept: 'application/json'
   },
   params: {
      sort: {
         newest: 'sort-by-latest'
      },
      orientation: {
         horizontal: 'orientation-landscape',
         vertical: 'orientation-portrait',
         square: 'orientation-square'
      },
      people: {
         true: 'number-of-people-1-person',
         false: 'number-of-people-no-people'
      },
      numberOfPeople: {
         '1': 'number-of-people-1-person',
         '2': 'number-of-people-2-people',
         '3': 'number-of-people-3-people'
      },
      color: {
         white: 'color-white',
         black: 'color-black',
         yellow: 'color-yellow',
         orange: 'color-orange',
         red: 'color-red',
         purple: 'color-purple',
         magenta: 'color-pink',
         green: 'color-green',
         teal: 'color-teal',
         blue: 'color-blue'
      },
      style: {
         selectiveFocus: 'background-blurred',
         isolated: 'background-isolated'
      },
      licence: {
         premium: undefined
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
         const data = source.data

         searchResults.meta = {
            currentPage: searchQuery?.page || 1,
            totalAssets: data.totalItems
         }

         data.items.forEach((asset: any) => {
            searchResults.assets.push({
               id: encodeStr(asset.id),
               assetUrl: `${this.baseUrl}/${asset.slug}-${asset.id}`,
               thumbnailUrl: asset.coverImage.w600,
               title: asset.title,
               contributor: undefined,
               contributorUrl: undefined,
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
      let path = `/data-api/page/items-page`,
         pathParams = ['/photos', params.keyword]

      if (params.sort) {
         pathParams.push(paramVal(this.params.sort, params.sort))
      }

      if (params.orientation) {
         pathParams.push(paramVal(this.params.orientation, params.orientation))
      }

      if (params.color) {
         pathParams.push(paramVal(this.params.color, params.color))
      }

      if (params.style) {
         pathParams.push(paramVal(this.params.style, params.style))
      }

      if (params.people && !params.numberOfPeople) {
         pathParams.push(paramVal(this.params.people, params.people))
      }

      if (params.numberOfPeople) {
         pathParams.push(paramVal(this.params.numberOfPeople, params.numberOfPeople))
      }

      if (params.page) {
         pathParams.push(`pg-${params.page}`)
      }

      const queryParams = new URLSearchParams(),
         validParams: any = {
            path: encodeURI(arrayUnique(pathParams as []).join('/'))
         }

      for (const param in validParams) {
         const value = validParams[param]

         if (value) queryParams.set(param, value)
      }

      return `${this.baseUrl}${path}?${queryParams.toString()}`
   }
}

export default EnvatoPhotos
