import { SearchQueryObjectType } from '@services/searchService/types'
import { ReactNode } from 'react'

export enum Actions {
   SIGN_OUT = 'SIGN_OUT',
   SET_SEARCH_FILTERS = 'SET_SEARCH_FILTERS',
   RESET_SEARCH_FILTERS = 'RESET_SEARCH_FILTERS',
   REDIRECT_AFTER_AUTH = 'REDIRECT_AFTER_AUTH'
}

export interface State {
   searchFilters?: SearchQueryObjectType
   redirectAfterAuthState?: string
}

export type Action = {
   type: Actions
   data?: any
}

export type AppContextType = State & {
   signOut: () => void
   setSearchFilters: (query: SearchQueryObjectType) => void
   resetSearchFilters: (query: SearchQueryObjectType) => void
   redirectAfterAuth: () => void
}

export type AppProviderProps = {
   children: ReactNode
}
