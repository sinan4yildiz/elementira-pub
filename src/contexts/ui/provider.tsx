import { uiReducer } from '@contexts/ui/reducers'
import { Actions, State, ToastType, UIProviderProps } from '@contexts/ui/types'
import React, { createContext, useCallback, useMemo, useReducer } from 'react'

const initialState: State = {
   mobileNavState: false,
   toasts: []
}

const UIContext = createContext<State | any>(initialState)

const UIProvider = (props: UIProviderProps) => {
   const [state, dispatch] = useReducer(uiReducer, initialState)

   const openMobileNav = useCallback(() => dispatch({ type: Actions.OPEN_MOBILE_NAV }), [])

   const closeMobileNav = useCallback(() => dispatch({ type: Actions.CLOSE_MOBILE_NAV }), [])

   const toggleMobileNav = useCallback(() => dispatch({ type: Actions.TOGGLE_MOBILE_NAV }), [])

   const pushToast = useCallback((data: ToastType) => dispatch({ type: Actions.PUSH_TOAST, data: data }), [])

   const removeToast = useCallback((data: number) => dispatch({ type: Actions.REMOVE_TOAST, data: data }), [])

   const value = useMemo(
      () => ({
         ...state,
         openMobileNav,
         closeMobileNav,
         toggleMobileNav,
         pushToast,
         removeToast
      }),
      [state]
   )

   return <UIContext.Provider value={value} {...props} />
}

UIContext.displayName = 'UIContext'

export { UIContext, UIProvider }
