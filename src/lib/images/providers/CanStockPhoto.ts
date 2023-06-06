import { ImageProviderType, ImageSearchResultsType } from '@lib/images/types'
import { encodeStr, errorHandler, isTrue, paramVal } from '@lib/utils'

const CanStockPhoto: ImageProviderType = {
   name: 'CanStockPhoto',
   baseUrl: 'https://www.canstockphoto.com',
   method: 'GET',
   active: true,
   json: true,
   headers: {
      'X-Requested-With': 'XMLHttpRequest'
   },
   params: {
      sort: {
         relevant: undefined
      },
      orientation: {
         horizontal: 'H',
         vertical: 'V',
         square: 'S',
         panoramic: 'P'
      },
      color: {
         white: 'white',
         black: 'black',
         yellow: 'yellow',
         orange: 'orange',
         brown: 'brown',
         gray: 'gray',
         red: 'red',
         purple: 'purple',
         magenta: 'magenta',
         green: 'green',
         teal: 'cyan',
         blue: 'blue'
      },
      people: {
         true: 'XX:XX:XX',
         false: undefined
      },
      ethnicity: {
         african: 'AF',
         chinese: 'AS',
         eastAsian: 'AS',
         japanese: 'AS',
         hispanic: 'HI',
         caucasian: 'CA',
         multiracial: 'MU',
         other: 'OT'
      },
      age: {
         infants: 'IN',
         children: 'CH',
         teenagers: 'TE',
         '20': 'YA',
         '30': 'YA',
         '40': 'MA',
         '50': 'MA',
         '60': 'SR',
         older: 'SR'
      },
      gender: {
         female: 'FE',
         male: 'MA'
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
            totalAssets: data.results.hits
         }

         data.results.docs.forEach((asset: any) => {
            searchResults.assets.push({
               id: encodeStr(asset.url),
               assetUrl: this.baseUrl + asset.url,
               thumbnailUrl: asset.data.replace(/"+/g, '"').match(/src=("(.*?)")/)[2],
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
      let path = `/search`

      const queryParams = new URLSearchParams(),
         validParams: any = {
            search_phrase: params.keyword || 'a',
            search_type: 'PHOTO',
            search_orientation: paramVal(this.params.orientation, params.orientation),
            search_color_group: paramVal(this.params.color, params.color),
            search_people: paramVal(this.params.people, params.people),
            search_exclude: params.exclude,
            safesearch: paramVal(this.params.safeSearch, params.safeSearch),
            search_page: params.page
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

      if (params.gender || params.age || params.ethnicity) {
         const searchPeopleParam = [
            paramVal(this.params.gender, params.gender) || 'XX',
            paramVal(this.params.ethnicity, params.ethnicity?.length ? params.ethnicity[0] : undefined) || 'XX',
            paramVal(this.params.age, params.age?.length ? params.age[0] : undefined) || 'XX'
         ]

         queryParams.set('search_people', searchPeopleParam.join(':'))
      }

      if (params.people && !isTrue(params.people)) {
         queryParams.set('search_people_exclude', '1')
      }

      return `${this.baseUrl}${path}?${queryParams.toString()}`
   }
}

export default CanStockPhoto
