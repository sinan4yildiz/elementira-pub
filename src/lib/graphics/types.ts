import { CommonSearchParamsInterface, ProviderType } from '@lib/types'
import { ReactElement } from 'react'

export type GraphicSearchParamSortType = {
   newest?: string
   popular?: string
   relevant?: string
   random?: string
   editorsChoice?: string
}

export type GraphicSearchParamOrientationType = {
   horizontal?: string
   vertical?: string
   square?: string
   panoramic?: string
}

export type GraphicSearchParamTypeType = {
   vectors?: string
   illustrations?: string
}

export type GraphicSearchParamFileTypeType = {
   svg?: string
   psd?: string
   ai?: string
   figma?: string
   sketch?: string
}

export type GraphicSearchParamColorType = {
   white?: string
   black?: string
   yellow?: string
   orange?: string
   red?: string
   purple?: string
   magenta?: string
   green?: string
   teal?: string
   blue?: string
}

export type GraphicSearchParamLicenceType = {
   free?: string
   premium?: string
}

export type GraphicSearchParamsType = {
   sort?: GraphicSearchParamSortType
   type?: GraphicSearchParamTypeType
   fileType?: GraphicSearchParamFileTypeType
   orientation?: GraphicSearchParamOrientationType
   color?: GraphicSearchParamColorType
   exclude?: string
   licence?: GraphicSearchParamLicenceType
}

export type GraphicSearchResultsType = {
   provider: string
   meta: {
      currentPage: number
      totalAssets: number
   }
   assets: Array<GraphicSearchResultsAssetType>
   relatedKeywords?: string[]
}

export type GraphicSearchResultsAssetType = {
   id: string
   assetUrl: string
   thumbnailUrl: string
   title: string | undefined
   downloadUrl: string | undefined
   premium: boolean | undefined
   provider: keyof GraphicProvidersType
}

export interface GraphicFiltersType {
   type?: keyof GraphicSearchParamTypeType
   fileType?: (keyof GraphicSearchParamFileTypeType)[]
   orientation?: keyof GraphicSearchParamOrientationType
   color?: keyof GraphicSearchParamColorType
   exclude?: string
   licence?: keyof GraphicSearchParamLicenceType
}

export type GraphicFilterType<T> = {
   name: keyof GraphicFiltersType
   label: string
   options?: Array<{
      value: keyof T
      label: string
      icon?: ReactElement
      color?: string
   }>
}

export interface GraphicSearchQueryInterface extends GraphicFiltersType, CommonSearchParamsInterface {
   sort?: keyof GraphicSearchParamSortType
}

export type GraphicProviderType = ProviderType<
   GraphicSearchParamsType,
   GraphicSearchResultsType,
   GraphicSearchQueryInterface
>

export type GraphicProvidersType<T = GraphicProviderType> = {
   ShutterStock: T
   Freepik: T
   AdobeStock: T
   DepositPhotos: T
   DreamsTime: T
   _123RF: T
   EnvatoGraphics: T
}
