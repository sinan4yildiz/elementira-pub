import { routes } from '@constants/index'
import { Action, Actions, State } from '@contexts/app/types'
import { signOut } from 'next-auth/react'

export const appReducer = (state: State, action: Action): State => {
   switch (action.type) {
      case Actions.SIGN_OUT: {
         ;(async () => {
            await signOut({ redirect: false })
         })()

         return {
            ...state
         }
      }

      case Actions.SET_SEARCH_FILTERS: {
         return {
            ...state,
            searchFilters: Object.assign(state.searchFilters || {}, action.data)
         }
      }

      case Actions.RESET_SEARCH_FILTERS: {
         return {
            ...state,
            searchFilters: action.data
         }
      }

      case Actions.REDIRECT_AFTER_AUTH: {
         const excluded = [routes.page.account.signIn, routes.page.account.signUp]
         const path = location.pathname + location.search

         if (excluded.includes(path)) {
            return {
               ...state
            }
         }

         return {
            ...state,
            redirectAfterAuthState: path
         }
      }

      default:
         return state
   }
}
