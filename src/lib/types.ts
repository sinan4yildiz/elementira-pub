import {
   GraphicProvidersType,
   GraphicProviderType,
   GraphicSearchQueryInterface,
   GraphicSearchResultsAssetType,
   GraphicSearchResultsType
} from '@lib/graphics/types'
import {
   ImageProvidersType,
   ImageProviderType,
   ImageSearchQueryInterface,
   ImageSearchResultsAssetType,
   ImageSearchResultsType
} from '@lib/images/types'
import {
   MusicProvidersType,
   MusicProviderType,
   MusicSearchQueryInterface,
   MusicSearchResultsAssetType,
   MusicSearchResultsType
} from '@lib/music/types'
import {
   SoundEffectProvidersType,
   SoundEffectProviderType,
   SoundEffectSearchQueryInterface,
   SoundEffectSearchResultsAssetType,
   SoundEffectSearchResultsType
} from '@lib/soundEffects/types'
import {
   TemplateProvidersType,
   TemplateProviderType,
   TemplateSearchQueryInterface,
   TemplateSearchResultsAssetType,
   TemplateSearchResultsType
} from '@lib/templates/types'
import {
   VideoProvidersType,
   VideoProviderType,
   VideoSearchQueryInterface,
   VideoSearchResultsAssetType,
   VideoSearchResultsType
} from '@lib/video/types'
import { AutocompleteParamsType } from '@services/autocompleteService/types'
import { RelatedKeywordsParamsType } from '@services/relatedKeywordService/types'

export type FetcherPropsType = {
   url: string
   method?: string | 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
   headers?: HeadersInit
   mode?: RequestMode
   data?: {
      [K: string]: any
   }
   signal?: AbortSignal
   json?: boolean
}

export type ProviderType<SearchParamsType, SearchResultsType, SearchQueryType> = {
   name: string
   baseUrl: string
   apiUrl?: string
   method: 'GET' | 'POST'
   headers: {
      Accept?: string
      Authorization?: string
      'X-Requested-With'?: string
   }
   active: boolean
   proxy?: boolean
   json?: boolean
   params: SearchParamsType
   searchResults: (source: any, searchQuery?: SearchQueryType) => SearchResultsType
   searchUrl: (params: SearchQueryType) => string
}

export type AllProvidersType = ImageProvidersType &
   VideoProvidersType &
   MusicProvidersType &
   SoundEffectProvidersType &
   GraphicProvidersType &
   TemplateProvidersType

export type AnyProviderType =
   | ImageProviderType
   | VideoProviderType
   | MusicProviderType
   | SoundEffectProviderType
   | GraphicProviderType
   | TemplateProviderType

export type AnySearchResultsType =
   | ImageSearchResultsType
   | VideoSearchResultsType
   | MusicSearchResultsType
   | SoundEffectSearchResultsType
   | GraphicSearchResultsType
   | TemplateSearchResultsType

export type AnySearchResultsAssetType =
   | ImageSearchResultsAssetType
   | VideoSearchResultsAssetType
   | MusicSearchResultsAssetType
   | SoundEffectSearchResultsAssetType
   | GraphicSearchResultsAssetType
   | TemplateSearchResultsAssetType

export type AnySearchParamsType =
   | ImageSearchQueryInterface
   | VideoSearchQueryInterface
   | MusicSearchQueryInterface
   | SoundEffectSearchQueryInterface
   | GraphicSearchQueryInterface
   | TemplateSearchQueryInterface

export interface CommonSearchParamsInterface {
   keyword?: string
   page?: number
   limit?: number
}

export type AutocompleteResultsType = AutocompleteItemType[]

export type AutocompleteItemType = {
   keyword: string
}

export type AutocompleteProviderType = {
   name: string
   baseUrl: string
   method: 'GET' | 'POST'
   headers: {
      Accept: string
   }
   searchUrl: (params: AutocompleteParamsType) => string
   results: (source: string) => AutocompleteResultsType
}

export type RelatedKeywordsResultsType = RelatedKeywordsItemType[]

export type RelatedKeywordsItemType = {
   keyword: string
}

export type RelatedKeywordsProviderType = {
   name: string
   baseUrl: string
   method: 'GET' | 'POST'
   headers: {
      Accept: string
   }
   searchUrl: (params: RelatedKeywordsParamsType) => string
   results: (source: any) => RelatedKeywordsResultsType
}
