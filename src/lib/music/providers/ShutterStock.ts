import { MusicProviderType, MusicSearchResultsType } from '@lib/music/types'
import { encodeStr, errorHandler, paramVal } from '@lib/utils'

const ShutterStock: MusicProviderType = {
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
         newest: '-freshness',
         popular: undefined,
         duration: '-length',
         tempo: '-bpm'
      },
      genre: {
         blues: 'blues',
         chillOut: 'chill-out',
         choirGroup: 'choir-group',
         classical: 'classical',
         corporate: 'corporate',
         country: 'country',
         dance: 'dance-techno',
         electronic: 'dance/electronic',
         house: 'dance-techno-house',
         african: 'world-african',
         caribbeanIsland: 'reggae-island',
         childrenKids: 'games-kids',
         cinematic: 'production-film-scores-cinematic',
         dubstep: 'dance-techno-dubstep',
         eastern: 'world-asian',
         folk: 'folk',
         funk: 'rb-funk',
         hipHopRap: 'hip-hop',
         indian: 'indie-pop',
         middleEast: 'world-middle-eastern',
         jazz: 'jazz',
         latin: 'latin',
         lounge: 'jazz-lounge',
         metal: 'punk/metal',
         pop: 'pop',
         rock: 'rock',
         techno: 'dance-techno-techno',
         trap: 'hip-hop-trap',
         rb: 'rb',
         tropical: 'dance-techno-tropical-house'
      },
      mood: {
         angryAggressive: 'angry',
         chillMellow: 'mellow',
         darkSuspenseful: 'dark',
         dramaticEmotional: 'dramatic',
         epicPowerful: 'confident',
         funnyQuirky: 'comedy-funny',
         happyCheerful: 'happy-cheerful',
         inspiringUplifting: 'inspiring',
         relaxingMeditation: 'relaxation-meditation',
         romanticSentimental: 'romantic-sentimental',
         sadSomber: 'sad',
         upbeatEnergetic: 'energetic',
         sexy: 'sexy',
         tender: 'tender',
         sophisticated: 'sophisticated',
         bright: 'bright'
      },
      tempo: {
         verySlow: undefined,
         slow: undefined,
         medium: undefined,
         upbeat: undefined,
         fast: undefined,
         veryFast: undefined
      },
      instrument: {
         accordion: 'accordion',
         acousticGuitar: 'acoustic-guitar',
         bass: 'bass',
         bells: 'bells',
         brass: 'brass',
         cello: 'cello',
         drums: 'drums',
         electricGuitar: 'electric-guitar',
         electricDrums: 'electronics',
         synthesizer: 'synthesizer',
         flute: 'flute',
         harmonica: 'harmonica',
         harp: 'harp',
         horns: 'horns',
         orchestra: 'orchestra',
         percussion: 'percussion',
         piano: 'piano',
         saxophone: 'saxophone',
         handClaps: 'handclaps',
         strings: 'strings',
         synth: 'synth-drums',
         trumpet: 'trumpet',
         violin: 'violin',
         whistling: 'whistle',
         woodwinds: 'woodwinds'
      },
      vocal: {
         background: 'true',
         male: 'true',
         female: 'true',
         noVocal: 'false'
      },
      minDuration: undefined,
      maxDuration: undefined,
      licence: {
         premium: undefined
      }
   },
   searchResults: function (source) {
      const searchResults: MusicSearchResultsType = {
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
            totalAssets: data.meta.pagination.total
         }

         data.tracks.forEach((asset: any) => {
            searchResults.assets.push({
               id: encodeStr(asset.previewMp3),
               title: asset.title,
               assetUrl: `${this.baseUrl}/music/track-${asset.id}`,
               previewUrl: asset.previewMp3,
               duration: asset.nativeDuration,
               artist: asset.artists[0],
               waveForm: asset.waveformPng,
               bpm: asset.beatsPerMinute,
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
      let path = `/_next/data/XDH1eJTLkmLwt9S0_KfwF/en/_shutterstock/music/search.json`

      const queryParams = new URLSearchParams(),
         validParams: any = {
            term: params.keyword,
            genres: paramVal(this.params.genre, params.genre),
            moods: paramVal(this.params.mood, params.mood),
            instruments: paramVal(this.params.instrument, params.instrument),
            vocals: paramVal(this.params.vocal, params.vocal),
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

export default ShutterStock
