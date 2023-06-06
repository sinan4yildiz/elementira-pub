import { AppAssetsType, AppProvidersType } from '@constants/app/types'
import { GraphicSearchQueryInterface } from '@lib/graphics/types'
import { ImageSearchQueryInterface } from '@lib/images/types'
import { MusicSearchQueryInterface } from '@lib/music/types'
import { SoundEffectSearchQueryInterface } from '@lib/soundEffects/types'
import { TemplateSearchQueryInterface } from '@lib/templates/types'
import { AllProvidersType, AnyProviderType } from '@lib/types'
import { VideoSearchQueryInterface } from '@lib/video/types'

export interface SearchServiceInterface {
   readonly props: SearchServicePropsType

   get queue(): SearchServiceQueueType

   searchPageUrl(host: boolean): string

   results(): Promise<Response>

   recentSearches(assetType: string): Promise<Response>

   clearRecentSearches(assetType: string): Promise<Response>
}

export type SearchQueryObjectType = ImageSearchQueryInterface &
   VideoSearchQueryInterface &
   MusicSearchQueryInterface &
   SoundEffectSearchQueryInterface &
   GraphicSearchQueryInterface &
   TemplateSearchQueryInterface & {
      assetType: keyof AppAssetsType
      providers?: keyof AllProvidersType
   }

export type SearchServicePropsType = {
   assetType: keyof AppProvidersType
   searchQuery: SearchQueryObjectType
   queue?: SearchServiceQueueType
}

export type SearchServiceQueueType = {
   matched: AnyProviderType | {}
   unmatched: AnyProviderType | {}
}
