import { appReducer } from '@contexts/app/reducers'
import { Actions, AppProviderProps, State } from '@contexts/app/types'
import { NextParsedUrlQuery } from 'next/dist/server/request-meta'
import React, { createContext, useCallback, useMemo, useReducer } from 'react'

const initialState: State = {
   searchFilters: undefined,
   redirectAfterAuthState: undefined
}

const AppContext = createContext<State | any>(initialState)

const AppProvider = (props: AppProviderProps) => {
   const [state, dispatch] = useReducer(appReducer, initialState)

   const signOut = useCallback(() => dispatch({ type: Actions.SIGN_OUT }), [])

   const setSearchFilters = useCallback(
      (query: NextParsedUrlQuery) => dispatch({ type: Actions.SET_SEARCH_FILTERS, data: query }),
      []
   )

   const resetSearchFilters = useCallback(
      (query: NextParsedUrlQuery) => dispatch({ type: Actions.RESET_SEARCH_FILTERS, data: query }),
      []
   )

   const redirectAfterAuth = useCallback(() => dispatch({ type: Actions.REDIRECT_AFTER_AUTH }), [])

   const value = useMemo(
      () => ({
         ...state,
         signOut,
         setSearchFilters,
         resetSearchFilters,
         redirectAfterAuth
      }),
      [state]
   )

   return <AppContext.Provider value={value} {...props} />
}

AppContext.displayName = 'AppContext'

export { AppContext, AppProvider }
