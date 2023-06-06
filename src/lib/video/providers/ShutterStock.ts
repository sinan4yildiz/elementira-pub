import { encodeStr, errorHandler, paramVal, resolutionName } from '@lib/utils'
import { VideoProviderType, VideoSearchResultsType } from '@lib/video/types'

const ShutterStock: VideoProviderType = {
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
         popular: undefined,
         newest: 'newest',
         relevant: 'relevant',
         random: 'random'
      },
      resolution: {
         '4K': '4k',
         SD: 'sd',
         HD: 'hd'
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
      aspectRatio: {
         '4:3': '4:3',
         '16:9': '16:9'
      },
      minDuration: undefined,
      maxDuration: undefined,
      people: {
         true: 'true',
         false: 'false'
      },
      numberOfPeople: {
         '1': '1',
         '2': '2',
         '3': '3',
         more: '4'
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
   searchResults: function (source) {
      const searchResults: VideoSearchResultsType = {
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
            currentPage: data.pageNumber,
            totalAssets: data.meta.pagination.total
         }

         data.videos.forEach((asset: any) => {
            searchResults.assets.push({
               id: encodeStr(asset.id),
               assetUrl: `${this.baseUrl}/video/clip-${asset.id}`,
               description: asset.description,
               previewUrl: asset.previewVideoUrls.webm,
               previewFormat: 'webm',
               thumbnailUrl: asset.thumbImageUrl,
               duration: asset.duration,
               resolution: resolutionName(
                  (asset.sizes.ultrahd4KOriginal || asset.sizes.hdOriginal || asset.sizes.sdOriginal)?.width,
                  (asset.sizes.ultrahd4KOriginal || asset.sizes.hdOriginal || asset.sizes.sdOriginal)?.height
               ),
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
      let path = `/_next/data/XDH1eJTLkmLwt9S0_KfwF/en/_shutterstock/video/search.json`

      const queryParams = new URLSearchParams(),
         validParams: any = {
            term: params.keyword,
            res: paramVal(this.params.resolution, params.resolution),
            fps: paramVal(this.params.fps, params.fps),
            aspect_ratio: paramVal(this.params.aspectRatio, params.aspectRatio),
            people_number: paramVal(this.params.numberOfPeople, params.numberOfPeople),
            mreleased: paramVal(this.params.people, params.people),
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

      // Duration
      if (params.minDuration || params.maxDuration) {
         queryParams.set('duration', [params.minDuration || 0, params.maxDuration || 600].join('-'))
      }

      return `${this.baseUrl}${path}?${queryParams.toString()}`
   }
}

export default ShutterStock
