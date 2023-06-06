import { ImageProviderType, ImageSearchResultsType } from '@lib/images/types'
import { encodeStr, errorHandler, paramVal } from '@lib/utils'

const BigStockPhoto: ImageProviderType = {
   name: 'BigStockPhoto',
   baseUrl: 'https://www.bigstockphoto.com',
   method: 'GET',
   active: true,
   json: true,
   headers: {
      'X-Requested-With': 'XMLHttpRequest'
   },
   params: {
      sort: {
         newest: 'new',
         relevant: 'relevant',
         popular: 'popular'
      },
      orientation: {
         horizontal: 'h',
         vertical: 'v'
      },
      people: {
         true: undefined
      },
      numberOfPeople: {
         '1': '1',
         '2': '2',
         '3': '3',
         '4': '4'
      },
      usage: {
         editorial: 'editorial',
         nonEditorial: 'non-editorial'
      },
      licence: {
         premium: undefined
      },
      exclude: undefined,
      safeSearch: {
         true: undefined,
         false: 'n'
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
            searchResults.assets.push({
               id: encodeStr(asset.id),
               assetUrl: this.baseUrl + asset.permalink,
               thumbnailUrl: asset.url,
               title: asset.display_title,
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
      let path = `/search/${params.keyword || ''}`

      const queryParams = new URLSearchParams(),
         validParams: any = {
            photos: 'y',
            orientation: paramVal(this.params.orientation, params.orientation),
            people_number: paramVal(this.params.numberOfPeople, params.numberOfPeople),
            release: paramVal(this.params.usage, params.usage),
            exclude: params.exclude,
            safesearch: paramVal(this.params.safeSearch, params.safeSearch),
            order: paramVal(this.params.sort, params.sort),
            start: (params.page || 0) * 150
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

      // People
      if (params.people && !params.numberOfPeople) {
         queryParams.set('people_number', '1')
      }

      return `${this.baseUrl}${path}?${queryParams.toString()}`
   }
}

export default BigStockPhoto
