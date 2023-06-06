import { CommonSearchParamsInterface, ProviderType } from '@lib/types'
import { ReactElement } from 'react'

export type MusicSearchParamSortType = {
   newest?: string
   popular?: string
   relevant?: string
   duration?: string
   tempo?: string
}

export type MusicSearchParamGenreType = {
   blues?: string
   chillOut?: string
   choirGroup?: string
   classical?: string
   corporate?: string
   country?: string
   dance?: string
   electronic?: string
   house?: string
   african?: string
   caribbeanIsland?: string
   celtic?: string
   childrenKids?: string
   cinematic?: string
   dubstep?: string
   eastern?: string
   european?: string
   folk?: string
   funk?: string
   hipHopRap?: string
   indian?: string
   middleEast?: string
   jazz?: string
   latin?: string
   lounge?: string
   metal?: string
   pop?: string
   rock?: string
   techno?: string
   rb?: string
   trap?: string
   tropical?: string
}

export type MusicSearchParamMoodType = {
   angryAggressive?: string
   chillMellow?: string
   darkSuspenseful?: string
   dramaticEmotional?: string
   epicPowerful?: string
   funnyQuirky?: string
   happyCheerful?: string
   inspiringUplifting?: string
   relaxingMeditation?: string
   romanticSentimental?: string
   sadSomber?: string
   upbeatEnergetic?: string
   sexy?: string
   tender?: string
   sophisticated?: string
   bright?: string
}

export type MusicSearchParamTempoType = {
   verySlow?: string
   slow?: string
   medium?: string
   upbeat?: string
   fast?: string
   veryFast?: string
}

export type MusicSearchParamInstrumentType = {
   accordion?: string
   acousticGuitar?: string
   banjo?: string
   bass?: string
   bells?: string
   brass?: string
   cello?: string
   drums?: string
   electricGuitar?: string
   electricDrums?: string
   synthesizer?: string
   flute?: string
   harmonica?: string
   harp?: string
   horns?: string
   orchestra?: string
   percussion?: string
   piano?: string
   saxophone?: string
   handClaps?: string
   strings?: string
   synth?: string
   trumpet?: string
   violin?: string
   whistling?: string
   woodwinds?: string
}

export type MusicSearchParamVocalType = {
   background?: string
   male?: string
   female?: string
   noVocal?: string
}

export type VideoSearchParamLoopableType = {
   true?: string
   false?: string
}

export type MusicSearchParamLicenceType = {
   free?: string
   premium?: string
}

export type MusicSearchParamsType = {
   sort?: MusicSearchParamSortType
   genre?: MusicSearchParamGenreType
   mood?: MusicSearchParamMoodType
   tempo?: MusicSearchParamTempoType
   instrument?: MusicSearchParamInstrumentType
   vocal?: MusicSearchParamVocalType
   minDuration?: number
   maxDuration?: number
   loopable?: VideoSearchParamLoopableType
   licence?: MusicSearchParamLicenceType
}

export type MusicSearchResultsType = {
   provider: string
   meta: {
      currentPage: number
      totalAssets: number
   }
   assets: Array<MusicSearchResultsAssetType>
   relatedKeywords?: string[]
   licence?: MusicSearchParamLicenceType
}

export type MusicSearchResultsAssetType = {
   id: string
   title: string
   assetUrl: string
   previewUrl: string
   duration: number
   artist?: string
   waveForm?: string
   peaks?: string | []
   bpm?: number
   downloadUrl: string | undefined
   premium: boolean | undefined
   provider: keyof MusicProvidersType
}

export interface MusicFiltersType {
   sort?: keyof MusicSearchParamSortType
   genre?: (keyof MusicSearchParamGenreType)[]
   mood?: (keyof MusicSearchParamMoodType)[]
   tempo?: keyof MusicSearchParamTempoType
   instrument?: (keyof MusicSearchParamInstrumentType)[]
   vocal?: keyof MusicSearchParamVocalType
   minDuration?: number
   maxDuration?: number
   loopable?: boolean
   licence?: keyof MusicSearchParamLicenceType
}

export type MusicFilterType<T> = {
   name: keyof MusicFiltersType
   label: string
   options?: Array<{
      value: keyof T
      label: string
      icon?: ReactElement
      color?: string
   }>
}

export interface MusicSearchQueryInterface extends MusicFiltersType, CommonSearchParamsInterface {
   sort?: keyof MusicSearchParamSortType
}

export type MusicProviderType = ProviderType<MusicSearchParamsType, MusicSearchResultsType, MusicSearchQueryInterface>

export type MusicProvidersType<T = MusicProviderType> = {
   ShutterStock: T
   AdobeStock: T
   EnvatoMusic: T
   _123RF: T
}
