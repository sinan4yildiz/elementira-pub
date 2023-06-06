import { GraphicSearchQueryInterface } from '@lib/graphics/types'
import { ImageSearchQueryInterface } from '@lib/images/types'
import { MusicSearchQueryInterface } from '@lib/music/types'
import { SoundEffectSearchQueryInterface } from '@lib/soundEffects/types'
import { TemplateSearchQueryInterface } from '@lib/templates/types'
import { VideoSearchQueryInterface } from '@lib/video/types'

export type ImageMultipleSearchQueriesType = {
   [key: string]: ImageSearchQueryInterface
}

export type VideoMultipleSearchQueriesType = {
   [key: string]: VideoSearchQueryInterface
}

export type MusicMultipleSearchQueriesType = {
   [key: string]: MusicSearchQueryInterface
}

export type SoundEffectMultipleSearchQueriesType = {
   [key: string]: SoundEffectSearchQueryInterface
}

export type GraphicMultipleSearchQueriesType = {
   [key: string]: GraphicSearchQueryInterface
}

export type TemplateMultipleSearchQueriesType = {
   [key: string]: TemplateSearchQueryInterface
}
