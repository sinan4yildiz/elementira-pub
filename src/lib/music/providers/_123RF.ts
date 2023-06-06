import { MusicProviderType, MusicSearchResultsType } from '@lib/music/types'
import { encodeStr, errorHandler, paramVal, parseDOM, toSeconds } from '@lib/utils'

const _123RF: MusicProviderType = {
   name: '_123RF',
   baseUrl: 'https://www.123rf.com',
   method: 'POST',
   active: true,
   headers: {
      Accept: 'text/html'
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
      const DOM = parseDOM(source)

      const searchResults: MusicSearchResultsType = {
         provider: this.name as never,
         meta: {
            currentPage: 0,
            totalAssets: 0
         },
         assets: []
      }

      try {
         const totalPages = parseInt(
            DOM.querySelector('.gobutton')
               ?.parentNode.innerText.trim()
               .replace(/\s+/g, ' ')
               .split(' ')
               .slice(-1)[0] as string
         )

         searchResults.meta = {
            currentPage: searchQuery?.page || 1,
            totalAssets: totalPages * 30
         }

         DOM.querySelectorAll('.track-row-container.audio-contain').forEach(asset => {
            const title = asset.querySelector(':scope > div:nth-child(2) a.sm2_link')?.innerText.trim() as string,
               artist = asset.querySelector(':scope > div:nth-child(2) a:not(.sm2_link)')?.innerText.trim(),
               assetUrl = this.baseUrl + asset.querySelector('.audio-id-show')?.getAttribute('href'),
               duration = asset.querySelector('.duration-column')?.innerText.trim() as string,
               previewUrl = asset
                  .querySelector('[data-audio]')
                  ?.getAttribute('data-audio')
                  ?.replace('//', 'https://') as string

            searchResults.assets.push({
               id: encodeStr(assetUrl),
               title: title,
               assetUrl: assetUrl,
               previewUrl: previewUrl,
               duration: toSeconds(duration),
               artist: artist,
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
      let path = `/audiosearch.php`

      const queryParams = new URLSearchParams(),
         validParams: any = {
            word: params.keyword || 'pop',
            order_by: paramVal(this.params.sort, params.sort),
            page: params.page
         }

      for (const param in validParams) {
         const value = validParams[param]

         if (value) queryParams.set(param, value)
      }

      return `${this.baseUrl}${path}?${queryParams.toString()}`
   }
}

export default _123RF
