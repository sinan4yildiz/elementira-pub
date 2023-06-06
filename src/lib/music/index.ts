import { _123RF, AdobeStock, EnvatoMusic, ShutterStock } from '@lib/music/providers'
import { MusicProvidersType } from '@lib/music/types'
import musicAutocomplete from './autocomplete'
import musicRelatedKeywords from './relatedKeywords'

const musicProviders: MusicProvidersType = {
   ShutterStock: ShutterStock,
   AdobeStock: AdobeStock,
   EnvatoMusic: EnvatoMusic,
   _123RF: _123RF
}

export { musicProviders, musicAutocomplete, musicRelatedKeywords }
