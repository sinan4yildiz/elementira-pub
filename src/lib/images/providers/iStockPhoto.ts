import { ImageProviderType, ImageSearchResultsType } from '@lib/images/types'
import { encodeStr, errorHandler, isTrue, paramVal } from '@lib/utils'

const iStockPhoto: ImageProviderType = {
   name: 'iStockPhoto',
   baseUrl: 'https://www.istockphoto.com',
   method: 'GET',
   active: true,
   proxy: true,
   json: true,
   headers: {
      Accept: 'application/json'
   },
   params: {
      sort: {
         newest: 'newest',
         popular: 'mostpopular',
         relevant: 'best'
      },
      orientation: {
         horizontal: 'horizontal',
         vertical: 'vertical',
         square: 'square',
         panoramic: 'panoramichorizontal,panoramicvertical'
      },
      age: {
         infants: 'baby',
         children: 'child',
         teenagers: 'teenager',
         '20': 'youngadult',
         '30': 'adult',
         '40': 'adultsonly',
         '50': 'matureadult',
         '60': 'senioradult',
         older: 'senioradult'
      },
      people: {
         true: undefined,
         false: undefined
      },
      numberOfPeople: {
         '1': 'one',
         '2': 'two',
         '3': 'group',
         '4': 'group',
         more: 'group'
      },
      ethnicity: {
         african: 'black',
         africanAmerican: 'black',
         black: 'black',
         brazilian: 'hispaniclatino',
         chinese: 'eastasian',
         caucasian: 'caucasian',
         eastAsian: 'eastasian',
         hispanic: 'hispaniclatino',
         japanese: 'eastasian',
         middleEastern: 'middleeastern',
         nativeAmerican: 'nativeamericanfirstnations',
         pacificIslander: 'pacificislander',
         southAsian: 'southasian',
         southeastAsian: 'southeastasian',
         other: 'mixedraceperson'
      },
      mood: {
         warm: 'warm',
         cool: 'cool',
         vivid: 'vivid',
         natural: 'neutral',
         bold: 'dramatic',
         dramatic: 'moody',
         blackWhite: 'bandw'
      },
      color: {
         white: '#FFFFFF',
         black: '#000000',
         yellow: '#F1F129',
         orange: '#F48700',
         red: '#E72525',
         purple: '#7F00FF',
         magenta: '#EA06B1',
         green: '#06D506',
         teal: '#0ECB9B',
         blue: '#1F55F8'
      },
      cameraAngle: {
         headShot: 'headshot',
         waistUp: 'waistup',
         threeQuarter: 'threequarterlength',
         fullLength: 'fulllength',
         lookingAtCamera: 'lookingatcamera',
         candid: 'candid'
      },
      size: {
         large: 'xlarge',
         xLarge: 'xlarge',
         xxLarge: 'xxlarge',
         xxxLarge: 'xxxlarge'
      },
      usage: {
         editorial: 'editorial',
         nonEditorial: 'creative'
      },
      licence: {
         premium: undefined
      },
      safeSearch: {
         true: undefined,
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
            totalAssets: data.gallery.totalNumberOfResults
         }

         data.gallery.assets.forEach((asset: any) => {
            searchResults.assets.push({
               id: encodeStr(asset.landingUrl),
               assetUrl: this.baseUrl + asset.landingUrl,
               thumbnailUrl: asset.thumbUrl,
               title: asset.altText,
               contributor: undefined,
               contributorUrl: undefined,
               downloadUrl: undefined,
               premium: true,
               provider: this.name as never
            })
         })

         searchResults.relatedKeywords = data.relatedTerms
      } catch (error: any) {
         errorHandler(new Error(error))
      }

      return searchResults
   },
   searchUrl: function (params) {
      let path = `/en/search/2/image`

      if (isTrue(params.people) && !params.numberOfPeople && !params.ethnicity && !params.age) {
         params.numberOfPeople = '1'
      }

      const queryParams = new URLSearchParams(),
         validParams: any = {
            phrase: params.keyword,
            mediatype: 'photography',
            orientations: paramVal(this.params.orientation, params.orientation),
            _colorindex: paramVal(this.params.color, params.color),
            ethnicity: paramVal(this.params.ethnicity, params.ethnicity),
            ageofpeople: paramVal(this.params.age, params.age),
            compositions: paramVal(this.params.cameraAngle, params.cameraAngle),
            numberofpeople: paramVal(this.params.numberOfPeople, params.numberOfPeople),
            size: paramVal(this.params.size, params.size),
            family: paramVal(this.params.usage, params.usage),
            mood: paramVal(this.params.mood, params.mood),
            excludenudity: paramVal(this.params.safeSearch, params.safeSearch),
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

      // People
      if (params.people && !isTrue(params.people)) {
         queryParams.set('numberofpeople', 'none')
      }

      return `${this.baseUrl}${path}?${queryParams.toString()}`
   }
}

export default iStockPhoto
