import { ShutterStock } from '@lib/soundEffects/providers'
import { SoundEffectProvidersType } from '@lib/soundEffects/types'
import soundEffectAutocomplete from './autocomplete'
import soundEffectRelatedKeywords from './relatedKeywords'

const soundEffectProviders: SoundEffectProvidersType = {
   ShutterStock: ShutterStock
}

export { soundEffectProviders, soundEffectAutocomplete, soundEffectRelatedKeywords }
