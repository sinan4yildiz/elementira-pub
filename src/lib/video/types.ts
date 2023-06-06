import { CommonSearchParamsInterface, ProviderType } from '@lib/types'
import { ReactElement } from 'react'

export type VideoSearchParamSortType = {
   newest?: string
   popular?: string
   relevant?: string
   random?: string
   editorsChoice?: string
}

export type VideoSearchParamResolutionType = {
   '4K'?: string
   HD?: string
   SD?: string
}

export type VideoSearchParamAspectRatioType = {
   '4:3'?: string
   '16:9'?: string
   nonStandard?: string
}

export type VideoSearchParamFPSType = {
   '23.98'?: string
   '24'?: string
   '25'?: string
   '29.97'?: string
   '30'?: string
   '50'?: string
   '59'?: string
   '60'?: string
}

export type VideoSearchParamPeopleType = {
   true?: string
   false?: string
}

export type VideoSearchParamNumberOfPeopleType = {
   '1'?: string
   '2'?: string
   '3'?: string
   '4'?: string
   more?: string
}

export type VideoSearchParamOrientationType = {
   horizontal?: string
   vertical?: string
   square?: string
   panoramic?: string
}

export type VideoSearchParamLicenceType = {
   free?: string
   premium?: string
}

export type VideoSearchParamSafeSearchType = {
   true?: string
   false?: string
}

export type VideoSearchParamUsageType = {
   editorial?: string
   nonEditorial?: string
}

export type VideoSearchParamUndiscoveredType = {
   true?: string
   false?: string
}

export type VideoSearchParamsType = {
   sort?: VideoSearchParamSortType
   resolution?: VideoSearchParamResolutionType
   fps?: VideoSearchParamFPSType
   aspectRatio?: VideoSearchParamAspectRatioType
   minDuration?: number
   maxDuration?: number
   orientation?: VideoSearchParamOrientationType
   people?: VideoSearchParamPeopleType
   numberOfPeople?: VideoSearchParamNumberOfPeopleType
   usage?: VideoSearchParamUsageType
   exclude?: string
   undiscovered?: VideoSearchParamUndiscoveredType
   licence?: VideoSearchParamLicenceType
   safeSearch?: VideoSearchParamSafeSearchType
}

export type VideoSearchResultsType = {
   provider: string
   meta: {
      currentPage: number
      totalAssets: number
   }
   assets: Array<VideoSearchResultsAssetType>
   relatedKeywords?: string[]
}

export type VideoSearchResultsAssetType = {
   id: string
   description: string
   assetUrl: string
   previewUrl: string
   previewFormat: string
   thumbnailUrl: string
   duration: number
   resolution: keyof VideoSearchParamResolutionType | null
   downloadUrl: string | undefined
   premium: boolean | undefined
   provider: keyof VideoProvidersType
}

export interface VideoFiltersType {
   sort?: keyof VideoSearchParamSortType
   resolution?: (keyof VideoSearchParamResolutionType)[]
   fps?: (keyof VideoSearchParamFPSType)[]
   aspectRatio?: keyof VideoSearchParamAspectRatioType
   minDuration?: number
   maxDuration?: number
   orientation?: keyof VideoSearchParamOrientationType
   usage?: keyof VideoSearchParamUsageType
   people?: boolean
   numberOfPeople?: keyof VideoSearchParamNumberOfPeopleType
   exclude?: string
   undiscovered?: boolean
   licence?: keyof VideoSearchParamLicenceType
   safeSearch?: boolean
}

export type VideoFilterType<T> = {
   name: keyof VideoFiltersType
   label: string
   options?: Array<{
      value: keyof T
      label: string
      icon?: ReactElement
      color?: string
   }>
}

export interface VideoSearchQueryInterface extends VideoFiltersType, CommonSearchParamsInterface {
   sort?: keyof VideoSearchParamSortType
}

export type VideoProviderType = ProviderType<VideoSearchParamsType, VideoSearchResultsType, VideoSearchQueryInterface>

export type VideoProvidersType<T = VideoProviderType> = {
   ShutterStock: T
   Pixabay: T
   AdobeStock: T
   _123RF: T
   DepositPhotos: T
   EnvatoVideo: T
   GettyImages: T
   iStockPhoto: T
   Videvo: T
}
