import { CanStockPhoto } from '@lib/images/providers'
import { CommonSearchParamsInterface, ProviderType } from '@lib/types'
import { ReactElement } from 'react'

export type ImageSearchParamSortType = {
   newest?: string
   popular?: string
   relevant?: string
   random?: string
   editorsChoice?: string
}

export type ImageSearchParamOrientationType = {
   horizontal?: string
   vertical?: string
   square?: string
   panoramic?: string
}

export type ImageSearchParamSizeType = {
   small?: string
   medium?: string
   large?: string
   xLarge?: string
   xxLarge?: string
   xxxLarge?: string
}

export type ImageSearchParamPeopleType = {
   true?: string
   false?: string
}

export type ImageSearchParamNumberOfPeopleType = {
   '1'?: string
   '2'?: string
   '3'?: string
   '4'?: string
   more?: string
}

export type ImageSearchParamAgeType = {
   infants?: string
   children?: string
   teenagers?: string
   '20'?: string
   '30'?: string
   '40'?: string
   '50'?: string
   '60'?: string
   older?: string
}

export type ImageSearchParamGenderType = {
   male?: string
   female?: string
   nonBinary?: string
}

export type ImageSearchParamEthnicityType = {
   african?: string
   africanAmerican?: string
   black?: string
   brazilian?: string
   chinese?: string
   caucasian?: string
   eastAsian?: string
   hispanic?: string
   japanese?: string
   indian?: string
   middleEastern?: string
   nativeAmerican?: string
   pacificIslander?: string
   southAsian?: string
   southeastAsian?: string
   white?: string
   multiracial?: string
   other?: string
}

export type ImageSearchParamCameraAngleType = {
   headShot?: string
   waistUp?: string
   threeQuarter?: string
   fullLength?: string
   lookingAtCamera?: string
   candid?: string
   closeUp?: string
}

export type ImageSearchParamColorType = {
   white?: string
   black?: string
   yellow?: string
   orange?: string
   red?: string
   purple?: string
   brown?: string
   gray?: string
   magenta?: string
   green?: string
   teal?: string
   blue?: string
}

export type ImageSearchParamLicenceType = {
   free?: string
   premium?: string
}

export type ImageSearchParamSafeSearchType = {
   true?: string
   false?: string
}

export type ImageSearchParamUndiscoveredType = {
   true?: string
   false?: string
}

export type ImageSearchParamStyleType = {
   selectiveFocus?: string
   pattern?: string
   vibrance?: string
   grayish?: string
   isolated?: string
   transparent?: string
}

export type ImageSearchParamMoodType = {
   warm?: string
   cool?: string
   vivid?: string
   natural?: string
   bold?: string
   dramatic?: string
   blackWhite?: string
}

export type ImageSearchParamUsageType = {
   editorial?: string
   nonEditorial?: string
}

export type ImageSearchParamAuthenticType = {
   true?: string
   false?: string
}

export type ImageSearchParamsType = {
   sort?: ImageSearchParamSortType
   orientation?: ImageSearchParamOrientationType
   age?: ImageSearchParamAgeType
   gender?: ImageSearchParamGenderType
   people?: ImageSearchParamPeopleType
   numberOfPeople?: ImageSearchParamNumberOfPeopleType
   ethnicity?: ImageSearchParamEthnicityType
   mood?: ImageSearchParamMoodType
   color?: ImageSearchParamColorType
   style?: ImageSearchParamStyleType
   cameraAngle?: ImageSearchParamCameraAngleType
   authentic?: ImageSearchParamAuthenticType
   size?: ImageSearchParamSizeType
   minWidth?: number
   minHeight?: number
   usage?: ImageSearchParamUsageType
   exclude?: string
   undiscovered?: ImageSearchParamUndiscoveredType
   licence?: ImageSearchParamLicenceType
   safeSearch?: ImageSearchParamSafeSearchType
}

export type ImageSearchResultsType = {
   provider: string
   meta: {
      currentPage: number
      totalAssets: number
   }
   assets: Array<ImageSearchResultsAssetType>
   relatedKeywords?: string[]
}

export type ImageSearchResultsAssetType = {
   id: string
   assetUrl: string
   thumbnailUrl: string
   title: string | undefined
   downloadUrl: string | undefined
   premium: boolean | undefined
   contributor: string | undefined
   contributorUrl: string | undefined
   provider: keyof ImageProvidersType
}

export interface ImageFiltersType {
   orientation?: keyof ImageSearchParamOrientationType
   age?: (keyof ImageSearchParamAgeType)[]
   gender?: keyof ImageSearchParamGenderType
   people?: boolean
   numberOfPeople?: keyof ImageSearchParamNumberOfPeopleType
   ethnicity?: (keyof ImageSearchParamEthnicityType)[]
   color?: keyof ImageSearchParamColorType
   mood?: keyof ImageSearchParamMoodType
   style?: keyof ImageSearchParamStyleType
   cameraAngle?: keyof ImageSearchParamCameraAngleType
   authentic?: boolean
   size?: keyof ImageSearchParamSizeType
   minWidth?: number
   minHeight?: number
   usage?: keyof ImageSearchParamUsageType
   exclude?: string
   undiscovered?: boolean
   licence?: keyof ImageSearchParamLicenceType
   safeSearch?: boolean
}

export type ImageFilterType<T> = {
   name: keyof ImageFiltersType
   label: string
   options?: Array<{
      value: keyof T
      label: string
      icon?: ReactElement
      color?: string
   }>
}

export interface ImageSearchQueryInterface extends ImageFiltersType, CommonSearchParamsInterface {
   sort?: keyof ImageSearchParamSortType
}

export type ImageProviderType = ProviderType<ImageSearchParamsType, ImageSearchResultsType, ImageSearchQueryInterface>

export type ImageProvidersType<T = ImageProviderType> = {
   Unsplash: T
   Pexels: T
   ShutterStock: T
   Pixabay: T
   iStockPhoto: T
   GettyImages: T
   Freepik: T
   AdobeStock: T
   DreamsTime: T
   BigStockPhoto: T
   _123RF: T
   EnvatoPhotos: T
   DepositPhotos: T
   CanStockPhoto: T
}
