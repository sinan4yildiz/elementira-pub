import { encodeStr, errorHandler, isTrue, paramVal, resolutionName } from '@lib/utils'
import { VideoProviderType, VideoSearchResultsType } from '@lib/video/types'

const AdobeStock: VideoProviderType = {
   name: 'AdobeStock',
   baseUrl: 'https://stock.adobe.com/uk',
   method: 'GET',
   active: true,
   json: true,
   headers: {
      Accept: 'application/json'
   },
   params: {
      sort: {
         relevant: 'relevance',
         newest: 'creation',
         popular: 'nb_downloads',
         editorsChoice: 'featured'
      },
      resolution: {
         '4K': undefined,
         HD: undefined,
         SD: undefined
      },
      fps: {
         '23.98': 'val23976',
         '24': 'val24',
         '25': 'val25',
         '29.97': 'val2997',
         '30': 'val30',
         '50': 'val50',
         '59': 'val5994',
         '60': 'val60'
      },
      orientation: {
         horizontal: 'horizontal',
         vertical: 'vertical',
         square: 'square',
         panoramic: 'panoramic'
      },
      minDuration: undefined,
      maxDuration: undefined,
      numberOfPeople: {
         '1': '1',
         '2': '2'
      },
      undiscovered: {
         true: 'only'
      },
      people: {
         true: undefined,
         false: undefined
      },
      usage: {
         editorial: undefined,
         nonEditorial: undefined
      },
      licence: {
         premium: undefined
      },
      safeSearch: {
         true: '1',
         false: '0'
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
            totalAssets: data.total
         }

         for (const item in data.items) {
            const asset = data.items[item]

            searchResults.assets.push({
               id: encodeStr(asset.content_id.toString()),
               assetUrl: asset.content_url,
               description: asset.title,
               previewUrl: asset.video_preview_url,
               previewFormat: 'mp4',
               thumbnailUrl: asset.thumbnail_url_webp,
               duration: parseInt(asset.duration) / 1000,
               resolution: resolutionName(asset.content_original_width, asset.content_original_height),
               downloadUrl: undefined,
               premium: true,
               provider: this.name as never
            })
         }
      } catch (error: any) {
         errorHandler(new Error(error))
      }

      return searchResults
   },
   searchUrl: function (params) {
      let path = `/Ajax/Search`

      const queryParams = new URLSearchParams(),
         validParams: any = {
            k: params.keyword,
            search_type: params.keyword ? 'usertyped' : 'filter-select',
            'filters[content_type:video]': '1',
            'filters[undiscovered]:': paramVal(this.params.undiscovered, params.undiscovered),
            'filters[orientation]': paramVal(this.params.orientation, params.orientation),
            'filters[video_duration_min]': params.minDuration,
            'filters[video_duration_max]': params.maxDuration,
            'filters[video_frame_rate]': params.fps,
            safe_search: paramVal(this.params.safeSearch, params.safeSearch) ?? this.params.safeSearch?.true,
            order: paramVal(this.params.sort, params.sort) ?? this.params.sort?.relevant,
            limit: params.limit,
            search_page: params.page
         }

      for (const param in validParams) {
         const value = validParams[param]

         if (value) queryParams.set(param, value)
      }

      // People
      switch (isTrue(params.people)) {
         case true:
            queryParams.set('filters[releases:is_include]', '1')
            break
         case false:
            queryParams.set('filters[releases:is_exclude]', '1')
            break
      }

      // 4K
      if (params.resolution?.includes('4K')) {
         queryParams.set('filters[license_V_4K:on]', '1')
      }

      return `${this.baseUrl}${path}?${queryParams.toString()}`
   }
}

export default AdobeStock
