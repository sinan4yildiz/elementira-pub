import { env } from '@constants/index'
import { ImageProviderType, ImageSearchResultsType } from '@lib/images/types'
import { encodeStr, errorHandler, isTrue, paramVal } from '@lib/utils'

const DepositPhotos: ImageProviderType = {
   name: 'DepositPhotos',
   baseUrl: 'https://depositphotos.com',
   apiUrl: 'https://api.depositphotos.com',
   method: 'GET',
   active: true,
   json: true,
   headers: {
      Accept: 'application/json'
   },
   params: {
      sort: {
         relevant: '1',
         popular: '4',
         newest: '5',
         random: '6'
      },
      orientation: {
         horizontal: 'horizontal',
         vertical: 'vertical',
         square: 'square'
      },
      color: {
         red: '#fe0000',
         orange: '#f9be00',
         yellow: '#ffff00',
         green: '#027f00',
         teal: '#0d9488',
         blue: '#0005fd',
         purple: '#9333ea',
         magenta: '#ff01ff',
         brown: '#653201',
         black: '#000000',
         white: '#ffffff'
      },
      people: {
         true: 'true'
      },
      numberOfPeople: {
         '1': '1',
         '2': '2',
         '3': '3',
         '4': '4',
         more: '5'
      },
      ethnicity: {
         black: 'black',
         chinese: 'asian',
         caucasian: 'caucasian',
         eastAsian: 'asian',
         japanese: 'asian',
         southAsian: 'asian',
         other: 'other'
      },
      age: {
         infants: 'infant',
         children: 'child'
      },
      gender: {
         female: 'female',
         male: 'male'
      },
      licence: {
         premium: undefined
      },
      usage: {
         editorial: 'true',
         nonEditorial: 'false'
      },
      exclude: undefined,
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
            totalAssets: data.count
         }

         data.result.forEach((asset: any) => {
            searchResults.assets.push({
               id: encodeStr(asset.id),
               assetUrl: asset.itemurl,
               thumbnailUrl: asset.huge_thumb,
               title: asset.title,
               downloadUrl: undefined,
               contributor: undefined,
               contributorUrl: undefined,
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
      let path = `/`

      const queryParams = new URLSearchParams(),
         validParams: any = {
            dp_search_query: params.keyword || 'image',
            dp_search_color: paramVal(this.params.color, params.color),
            dp_search_orientation: paramVal(this.params.orientation, params.orientation),
            dp_search_gender: paramVal(this.params.gender, params.gender),
            dp_search_age: paramVal(this.params.age, params.age?.length ? params.age[0] : undefined),
            dp_search_race: paramVal(this.params.ethnicity, params.ethnicity?.length ? params.ethnicity[0] : undefined),
            dp_search_quantity: paramVal(this.params.numberOfPeople, params.numberOfPeople),
            dp_search_editorial: paramVal(this.params.usage, params.usage),
            dp_search_sort: paramVal(this.params.sort, params.sort),
            dp_search_nudity: paramVal(this.params.safeSearch, params.safeSearch),
            dp_search_vector: 'false',
            dp_search_video: 'false',
            dp_exclude_keywords: params.exclude,
            dp_search_offset: (params.page || 0) * 100,
            per_page: params.limit || 100
         }

      for (const param in validParams) {
         const value = validParams[param]

         if (value) queryParams.set(param, value)
      }

      // People
      if (isTrue(params.people) && !queryParams.has('dp_search_quantity')) queryParams.set('dp_search_quantity', '1')

      // Locale
      queryParams.set('dp_lang', 'en')

      // Command
      queryParams.set('dp_command', 'search')

      // API key
      queryParams.set('dp_apikey', env.private.DEPOSITPHOTOS_API_KEY as string)

      return `${this.apiUrl}${path}?${queryParams.toString()}`
   }
}

export default DepositPhotos
