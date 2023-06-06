import { ImageProviderType, ImageSearchResultsType } from '@lib/images/types'
import { encodeStr, errorHandler, isFilled, isTrue, paramVal } from '@lib/utils'

const _123RF: ImageProviderType = {
   name: '_123RF',
   baseUrl: 'https://www.123rf.com',
   method: 'POST',
   active: true,
   json: true,
   headers: {
      Accept: 'application/json'
   },
   params: {
      sort: {
         newest: '2'
      },
      orientation: {
         horizontal: '1',
         vertical: '2',
         square: '3',
         panoramic: '4'
      },
      age: {
         infants: '1',
         children: '2',
         teenagers: '3',
         '20': '4',
         '30': '5',
         '40': '6',
         '50': '7',
         '60': '8',
         older: '9'
      },
      people: {
         true: undefined,
         false: undefined
      },
      numberOfPeople: {
         '1': '1',
         '2': '2',
         '3': '3',
         '4': '4',
         more: '4'
      },
      ethnicity: {
         african: '2',
         black: '2',
         caucasian: '1',
         eastAsian: '4',
         chinese: '4',
         brazilian: '3',
         hispanic: '3',
         indian: '6',
         middleEastern: '7',
         southAsian: '5'
      },
      color: {
         white: '32',
         black: '1',
         yellow: '27',
         orange: '10',
         red: '17',
         purple: '12',
         magenta: '25',
         green: '28',
         teal: '21',
         blue: '14'
      },
      style: {
         isolated: '1',
         selectiveFocus: undefined,
         vibrance: undefined,
         pattern: undefined
      },
      authentic: {
         true: '1',
         false: undefined
      },
      usage: {
         editorial: '2',
         nonEditorial: '1'
      },
      exclude: undefined,
      licence: {
         premium: undefined
      },
      safeSearch: {
         true: undefined,
         false: '0'
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
            totalAssets: data.meta.total
         }

         data.data.forEach((asset: any) => {
            searchResults.assets.push({
               id: encodeStr(asset.attributes.detail_url),
               assetUrl: this.baseUrl + asset.attributes.detail_url,
               thumbnailUrl: asset.attributes.thumbnail_url,
               title: asset.attributes.description,
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
      let path = `/apicore/search`

      const queryParams = new URLSearchParams(),
         validParams: any = {
            type: 1,
            word: params.keyword || 'photo',
            imgtype: 1,
            orientation: paramVal(this.params.orientation, params.orientation),
            color: paramVal(this.params.color, params.color),
            ethnicity: paramVal(this.params.ethnicity, params.ethnicity),
            age: paramVal(this.params.age, params.age),
            num_ppl: paramVal(this.params.numberOfPeople, params.numberOfPeople),
            safe_search: paramVal(this.params.safeSearch, params.safeSearch),
            collection: paramVal(this.params.usage, params.usage),
            authentic: paramVal(this.params.authentic, params.authentic),
            isolated: paramVal(this.params.style, params.style),
            exclude: params.exclude,
            order_by: paramVal(this.params.sort, params.sort),
            page: params.page
         }

      for (const param in validParams) {
         const value = validParams[param]

         if (value) queryParams.set(param, value)
      }

      // Style
      switch (params.style) {
         case 'selectiveFocus':
            queryParams.set('bokeh', '1')
            break
         case 'pattern':
            queryParams.set('pattern', '1')
            break
         case 'vibrance':
            queryParams.set('vivid', '1')
            break
      }

      // People
      if (!isFilled(params.numberOfPeople)) {
         switch (isTrue(params.people)) {
            case true:
               queryParams.set('num_ppl', '1')
               break
            case false:
               queryParams.set('num_ppl', '0')
               break
         }
      }

      return `${this.baseUrl}${path}?${queryParams.toString()}`
   }
}

export default _123RF
