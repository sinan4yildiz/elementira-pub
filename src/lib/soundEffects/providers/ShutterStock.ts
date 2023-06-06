import { SoundEffectProviderType, SoundEffectSearchResultsType } from '@lib/soundEffects/types'
import { encodeStr, errorHandler, paramVal } from '@lib/utils'

const ShutterStock: SoundEffectProviderType = {
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
         relevant: 'relevant'
      },
      category: {
         game: '1036',
         transitions: '2157',
         human: '1042',
         animals: '1004',
         ambiance: '1003',
         urban: '1561',
         nature: '1054',
         futuristic: '1063',
         communication: '1017',
         crowd: '1020',
         magic: '1048',
         interface: '1070',
         cartoon: '1011',
         industrial: '1535',
         misc: '1021',
         alarm: '1002',
         laser: '1044',
         mechanic: '1049',
         vehicle: '1072',
         voice: '1073',
         water: '1074'
      },
      licence: {
         premium: undefined
      }
   },
   searchResults: function (source) {
      const searchResults: SoundEffectSearchResultsType = {
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
            currentPage: 1,
            totalAssets: data.meta.numFound
         }

         data.tracks.forEach((asset: any) => {
            searchResults.assets.push({
               id: encodeStr(asset.previewMp3),
               title: asset.title,
               assetUrl: `${this.baseUrl}/sound-effects/sound-${asset.id}`,
               previewUrl: asset.previewMp3,
               creator: asset.artist.name,
               duration:
                  asset.publishedAssets[0].duration ||
                  asset.publishedAssets[1].duration ||
                  asset.publishedAssets[2].duration,
               waveForm: asset.waveformPng,
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
      let path = `/_next/data/XDH1eJTLkmLwt9S0_KfwF/en/_shutterstock/sound-effects/search.json`

      const queryParams = new URLSearchParams(),
         validParams: any = {
            term: params.keyword,
            category: paramVal(this.params.category, params.category),
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

      return `${this.baseUrl}${path}?${queryParams.toString()}`
   }
}

export default ShutterStock
