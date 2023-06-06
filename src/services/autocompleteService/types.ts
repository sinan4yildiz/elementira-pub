import { AppProvidersType } from '@constants/app/types'

export interface AutocompleteServiceInterface {
   results(searchQuery: AutocompleteParamsType): Promise<Response>
}

export type AutocompleteParamsType = {
   assetType?: keyof AppProvidersType
   keyword: string
}
