import { AnyProviderType, AnySearchParamsType, AnySearchResultsType } from '@lib/types'

export interface FeederServiceInterface {
   readonly props: FeederServicePropsType

   get searchUrl(): string

   searchResults(): Promise<AnySearchResultsType>
}

export type FeederServicePropsType = {
   provider: AnyProviderType
   searchQuery: AnySearchParamsType
   scraper?: keyof FeederServiceScrapersType
}

export type FeederServiceScrapersType = {
   Native: object
   ScrapingBee: object
   ScraperApi: object
   BrightDataCenter: object
   BrightDataUnlocker: object
}
