import type { Action, State } from '@contexts/ui/types'
import { Actions } from '@contexts/ui/types'

export const uiReducer = (state: State, action: Action): State => {
   switch (action.type) {
      case Actions.OPEN_MOBILE_NAV: {
         return {
            ...state,
            mobileNavState: true
         }
      }

      case Actions.CLOSE_MOBILE_NAV: {
         return {
            ...state,
            mobileNavState: false
         }
      }

      case Actions.TOGGLE_MOBILE_NAV: {
         return {
            ...state,
            mobileNavState: !state.mobileNavState
         }
      }

      case Actions.PUSH_TOAST: {
         return {
            ...state,
            toasts: [action.data, ...state.toasts]
         }
      }

      case Actions.REMOVE_TOAST: {
         state.toasts.splice(action.data, 1)

         return {
            ...state,
            toasts: state.toasts
         }
      }

      default:
         return state
   }
}
