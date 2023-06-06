import { encodeStr, errorHandler, isFilled, isTrue, paramVal, resolutionName, toSeconds } from '@lib/utils'
import { VideoProviderType, VideoSearchResultsType } from '@lib/video/types'

const iStockPhoto: VideoProviderType = {
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
      resolution: {
         '4K': '4k',
         HD: 'hd',
         SD: 'sd'
      },
      fps: {
         '23.98': '23.98',
         '24': '24',
         '25': '25',
         '29.97': '29.97',
         '30': '30',
         '50': '50',
         '59': '59.94',
         '60': '60'
      },
      people: {
         true: undefined,
         false: undefined
      },
      numberOfPeople: {
         '1': 'one',
         '2': 'two',
         '3': 'group',
         more: 'group'
      },
      minDuration: undefined,
      maxDuration: undefined,
      licence: {
         premium: undefined
      },
      safeSearch: {
         true: undefined,
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
            totalAssets: data.gallery.totalNumberOfResults
         }

         data.gallery.assets.forEach((asset: any) => {
            searchResults.assets.push({
               id: encodeStr(asset.id.toString()),
               assetUrl: this.baseUrl + asset.landingUrl,
               description: asset.title,
               previewUrl: asset.filmPreviewUrl,
               previewFormat: 'mp4',
               thumbnailUrl: asset.thumbUrl,
               duration: toSeconds(asset.clipLength),
               resolution: resolutionName(asset.maxDimensions.width, asset.maxDimensions.height),
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
      let path = `/en/search/2/film`

      const queryParams = new URLSearchParams(),
         validParams: any = {
            phrase: params.keyword || '4k',
            filmdefinition: paramVal(this.params.resolution, params.resolution)?.join(),
            framerate: paramVal(this.params.fps, params.fps)?.join(),
            numberofpeople: paramVal(this.params.numberOfPeople, params.numberOfPeople)?.join(),
            videodurationmin: params.minDuration,
            videodurationmax: params.maxDuration,
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
      if (!isFilled(params.numberOfPeople)) {
         switch (isTrue(params.people)) {
            case true:
               queryParams.set('numberofpeople', 'one,two,group')
               break
            case false:
               queryParams.set('numberofpeople', 'none')
               break
         }
      }

      return `${this.baseUrl}${path}?${queryParams.toString()}`
   }
}

export default iStockPhoto
