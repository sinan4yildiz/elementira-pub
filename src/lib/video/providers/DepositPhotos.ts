import { env } from '@constants/index'
import { encodeStr, errorHandler, isTrue, paramVal, resolutionName } from '@lib/utils'
import { VideoProviderType, VideoSearchResultsType } from '@lib/video/types'

const DepositPhotos: VideoProviderType = {
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
      const searchResults: VideoSearchResultsType = {
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
               description: asset.description,
               previewUrl: asset.mp4,
               previewFormat: 'mp4',
               thumbnailUrl: asset.huge_thumb,
               duration: asset.length,
               resolution: resolutionName(asset.width, asset.height),
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
      let path = `/`

      const queryParams = new URLSearchParams(),
         validParams: any = {
            dp_search_query: params.keyword || 'video',
            dp_search_orientation: paramVal(this.params.orientation, params.orientation),
            dp_search_quantity: paramVal(this.params.numberOfPeople, params.numberOfPeople),
            dp_search_editorial: paramVal(this.params.usage, params.usage),
            dp_search_sort: paramVal(this.params.sort, params.sort),
            dp_search_nudity: paramVal(this.params.safeSearch, params.safeSearch),
            dp_search_vector: 'false',
            dp_search_photo: 'false',
            dp_search_video: 'true',
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

      // Resolution
      /*if (params.resolution?.length) {
         switch (params.resolution[0]) {
            case '4K':
               queryParams.set('dp_search_width', '3800')
               queryParams.set('dp_search_height', '2100')
               break

            case 'HD':
               queryParams.set('dp_search_width', '1900')
               queryParams.set('dp_search_height', '1000')

               queryParams.set('dp_search_max_width', '2000')
               queryParams.set('dp_search_max_height', '1100')
               break

            case 'SD':
               queryParams.set('dp_search_max_width', '800')
               queryParams.set('dp_search_max_height', '500')
               break
         }
      }*/

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
