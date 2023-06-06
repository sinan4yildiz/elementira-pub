import { CommonSearchParamsInterface, ProviderType } from '@lib/types'
import { ReactElement } from 'react'

export type SoundEffectSearchParamSortType = {
   newest?: string
   popular?: string
   relevant?: string
}

export type SoundEffectSearchParamCategoryType = {
   animals?: string
   ambiance?: string
   game?: string
   transitions?: string
   human?: string
   urban?: string
   nature?: string
   futuristic?: string
   communication?: string
   crowd?: string
   magic?: string
   interface?: string
   cartoon?: string
   industrial?: string
   misc?: string
   alarm?: string
   laser?: string
   mechanic?: string
   vehicle?: string
   voice?: string
   water?: string
}

export type SoundEffectSearchParamLicenceType = {
   free?: string
   premium?: string
}

export type SoundEffectSearchParamsType = {
   sort?: SoundEffectSearchParamSortType
   category?: SoundEffectSearchParamCategoryType
   minDuration?: number
   maxDuration?: number
   licence?: SoundEffectSearchParamLicenceType
}

export type SoundEffectSearchResultsType = {
   provider: string
   meta: {
      currentPage: number
      totalAssets: number
   }
   assets: Array<SoundEffectSearchResultsAssetType>
   relatedKeywords?: string[]
}

export type SoundEffectSearchResultsAssetType = {
   id: string
   title: string
   assetUrl: string
   previewUrl: string
   duration: number
   creator?: string
   waveForm?: string
   downloadUrl: string | undefined
   premium: boolean | undefined
   provider: keyof SoundEffectProvidersType
}

export interface SoundEffectFiltersType {
   category?: (keyof SoundEffectSearchParamCategoryType)[]
   minDuration?: number
   maxDuration?: number
   licence?: keyof SoundEffectSearchParamLicenceType
}

export type SoundEffectFilterType<T> = {
   name: keyof SoundEffectFiltersType
   label: string
   options?: Array<{
      value: keyof T
      label: string
      icon?: ReactElement
      color?: string
   }>
}

export interface SoundEffectSearchQueryInterface extends SoundEffectFiltersType, CommonSearchParamsInterface {
   sort?: keyof SoundEffectSearchParamSortType
}

export type SoundEffectProviderType = ProviderType<
   SoundEffectSearchParamsType,
   SoundEffectSearchResultsType,
   SoundEffectSearchQueryInterface
>

export type SoundEffectProvidersType<T = SoundEffectProviderType> = {
   ShutterStock: T
}
