import { AppProvidersType } from '@constants/app/types'

export interface RelatedKeywordServiceInterface {
   results(searchQuery: RelatedKeywordsParamsType): Promise<Response>
}

export type RelatedKeywordsParamsType = {
   assetType?: keyof AppProvidersType
   keyword: string
}
