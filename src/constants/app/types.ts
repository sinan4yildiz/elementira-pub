import { GraphicProvidersType } from '@lib/graphics/types'
import { ImageProvidersType } from '@lib/images/types'
import { MusicProvidersType } from '@lib/music/types'
import { SoundEffectProvidersType } from '@lib/soundEffects/types'
import { TemplateProvidersType } from '@lib/templates/types'
import { AutocompleteProviderType, RelatedKeywordsProviderType } from '@lib/types'
import { VideoProvidersType } from '@lib/video/types'

export type AppType = {
   assets: AppAssetsType
   providers: AppProvidersType
}

export type AppAssetsType<T = AppAssetType> = {
   [K in keyof AppProvidersType]: T
}

export type AppProvidersType = {
   images: ImageProvidersType
   video: VideoProvidersType
   music: MusicProvidersType
   soundEffects: SoundEffectProvidersType
   graphics: GraphicProvidersType
   templates: TemplateProvidersType
}

export type AppAssetFilterType = {
   multiple?: boolean
   var: any
}

export type AppAssetType = {
   name: keyof AppProvidersType
   title: string
   hero: {
      bg: Array<{
         file: string
         placeholder: string
      }>
   }
   featuredKeywords: string[]
   categories: {
      [K: string]: {
         title: string
         image: string
         keyword: string
      }
   }
   providers: AppProvidersType[keyof AppProvidersType]
   autocomplete: AutocompleteProviderType
   relatedKeywords: RelatedKeywordsProviderType
   sort: object
   filters: {
      [K: string]: AppAssetFilterType
   }
}
