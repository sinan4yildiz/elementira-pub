import { CommonSearchParamsInterface, ProviderType } from '@lib/types'
import { ReactElement } from 'react'
import EnvatoTemplates from './providers/EnvatoTemplates'

export type TemplateSearchParamSortType = {
   newest?: string
   popular?: string
   relevant?: string
   random?: string
}

export type TemplateSearchParamAppType = {
   photoshop?: string
   illustrator?: string
   inDesign?: string
   premierePro?: string
   premiereRush?: string
   msWord?: string
   msExcel?: string
   msPowerPoint?: string
   keynote?: string
   googleSheets?: string
   googleSlides?: string
}

export type TemplateSearchParamCategoryType = {
   banner?: string
   branding?: string
   businessCard?: string
   card?: string
   etsy?: string
   instagram?: string
   facebook?: string
   youtube?: string
   pinterest?: string
   flyer?: string
   entertainment?: string
   logo?: string
   advertisement?: string
   postcard?: string
   poster?: string
   presentation?: string
}

export type TemplateSearchParamLicenceType = {
   free?: string
   premium?: string
}

export type TemplateSearchParamsType = {
   sort?: TemplateSearchParamSortType
   app?: TemplateSearchParamAppType
   category?: TemplateSearchParamCategoryType
   licence?: TemplateSearchParamLicenceType
}

export type TemplateSearchResultsType = {
   provider: string
   meta: {
      currentPage: number
      totalAssets: number
   }
   assets: Array<TemplateSearchResultsAssetType>
   relatedKeywords?: string[]
}

export type TemplateSearchResultsAssetType = {
   id: string
   assetUrl: string
   thumbnailUrl: string
   title: string | undefined
   downloadUrl: string | undefined
   premium: boolean | undefined
   provider: keyof TemplateProvidersType
}

export interface TemplateFiltersType {
   app?: (keyof TemplateSearchParamAppType)[]
   category?: (keyof TemplateSearchParamCategoryType)[]
   licence?: keyof TemplateSearchParamLicenceType
}

export type TemplateFilterType<T> = {
   name: keyof TemplateFiltersType
   label: string
   options?: Array<{
      value: keyof T
      label: string
      icon?: ReactElement
      color?: string
   }>
}

export interface TemplateSearchQueryInterface extends TemplateFiltersType, CommonSearchParamsInterface {
   sort?: keyof TemplateSearchParamSortType
}

export type TemplateProviderType = ProviderType<
   TemplateSearchParamsType,
   TemplateSearchResultsType,
   TemplateSearchQueryInterface
>

export type TemplateProvidersType<T = TemplateProviderType> = {
   ShutterStock: T
   CreativeMarket: T
   EnvatoTemplates: T
}
