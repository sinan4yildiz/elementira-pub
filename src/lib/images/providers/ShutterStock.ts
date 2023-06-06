import { ImageProviderType, ImageSearchResultsType } from '@lib/images/types'
import { encodeStr, errorHandler, paramVal } from '@lib/utils'

const ShutterStock: ImageProviderType = {
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
         newest: 'newest',
         relevant: 'relevant',
         random: 'random'
      },
      orientation: {
         horizontal: 'horizontal',
         vertical: 'vertical'
      },
      age: {
         infants: 'infants',
         children: 'children',
         teenagers: 'teenagers',
         '20': '20s',
         '30': '30s',
         '40': '40s',
         '50': '50s',
         '60': '60s',
         older: 'older'
      },
      gender: {
         female: 'female',
         male: 'male',
         nonBinary: 'non-binary'
      },
      people: {
         true: 'true',
         false: 'false'
      },
      numberOfPeople: {
         '1': '1',
         '2': '2',
         '3': '3',
         '4': '4'
      },
      ethnicity: {
         african: 'african',
         africanAmerican: 'african_american',
         black: 'black',
         brazilian: 'brazilian',
         chinese: 'chinese',
         caucasian: 'caucasian',
         eastAsian: 'east_asian',
         hispanic: 'hispanic',
         japanese: 'japanese',
         middleEastern: 'middle_eastern',
         nativeAmerican: 'native_american',
         pacificIslander: 'pacific_islander',
         southAsian: 'south_asian',
         southeastAsian: 'southeast_asian',
         other: 'other'
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
      authentic: {
         true: 'true',
         false: undefined
      },
      minWidth: undefined,
      minHeight: undefined,
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
         false: 'off'
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
         const data = source.pageProps

         searchResults.meta = {
            currentPage: searchQuery?.page || 1,
            totalAssets: data.meta.pagination.totalRecords
         }

         data.assets.forEach((asset: any) => {
            searchResults.assets.push({
               id: encodeStr(asset.link),
               assetUrl: this.baseUrl + asset.link,
               thumbnailUrl: asset.displays['600W'].src,
               title: asset.alt,
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
      let path = `/_next/data/XDH1eJTLkmLwt9S0_KfwF/en/_shutterstock/search.json`

      const queryParams = new URLSearchParams(),
         validParams: any = {
            term: params.keyword,
            image_type: 'photo',
            orientation: paramVal(this.params.orientation, params.orientation),
            color: paramVal(this.params.color, params.color),
            ethnicity: paramVal(this.params.ethnicity, params.ethnicity),
            age: paramVal(this.params.age, params.age),
            gender: paramVal(this.params.gender, params.gender),
            people_number: paramVal(this.params.numberOfPeople, params.numberOfPeople),
            mreleased: paramVal(this.params.people, params.people),
            min_width: params.minWidth,
            min_height: params.minHeight,
            release: paramVal(this.params.usage, params.usage),
            authentic: paramVal(this.params.authentic, params.authentic),
            exclude: params.exclude,
            safe: paramVal(this.params.safeSearch, params.safeSearch),
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

      // Width & Height
      if (params.minWidth || params.minHeight) {
         queryParams.set('measurement', 'px')
      }

      return `${this.baseUrl}${path}?${queryParams.toString()}`
   }
}

export default ShutterStock
