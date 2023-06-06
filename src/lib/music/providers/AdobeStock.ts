import { MusicProviderType, MusicSearchResultsType } from '@lib/music/types'
import { encodeStr, errorHandler, paramVal, titleCase } from '@lib/utils'

const AdobeStock: MusicProviderType = {
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
         newest: 'creation',
         relevant: undefined
      },
      tempo: {
         verySlow: undefined,
         slow: undefined,
         medium: undefined,
         upbeat: undefined,
         fast: undefined,
         veryFast: undefined
      },
      vocal: {
         background: 'true',
         male: 'true',
         female: 'true',
         noVocal: 'false'
      },
      minDuration: undefined,
      maxDuration: undefined,
      loopable: {
         true: '',
         false: ''
      },
      licence: {
         premium: undefined
      }
   },
   searchResults: function (source, searchQuery) {
      const searchResults: MusicSearchResultsType = {
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
               title: titleCase(asset.title),
               assetUrl: asset.content_url,
               previewUrl: asset.audio_data.preview.url,
               duration: Math.ceil(parseInt(asset.audio_data.duration) / 1000),
               bpm: asset.audio_data.tempo,
               artist: asset.author,
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
            'filters[content_type:audio]': '1',
            'filters[video_duration_min]': params.minDuration,
            'filters[video_duration_max]': params.maxDuration,
            'filters[video_frame_rate]': params.maxDuration,
            order: paramVal(this.params.sort, params.sort) ?? this.params.sort?.relevant,
            limit: params.limit,
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

      // Tempo
      switch (params.tempo) {
         case 'verySlow':
            queryParams.set('bpm', '0-60')
            break
         case 'slow':
            queryParams.set('bpm', '60-90')
            break
         case 'medium':
            queryParams.set('bpm', '90-110')
            break
         case 'upbeat':
            queryParams.set('bpm', '110-140')
            break
         case 'fast':
            queryParams.set('bpm', '140-160')
            break
         case 'veryFast':
            queryParams.set('bpm', '160-300')
            break
      }

      // Duration
      if (params.minDuration || params.maxDuration) {
         queryParams.set('length', [params.minDuration || 0, params.maxDuration || 600].join('-'))
      }

      return `${this.baseUrl}${path}?${queryParams.toString()}`
   }
}

export default AdobeStock
