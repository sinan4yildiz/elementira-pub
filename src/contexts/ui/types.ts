import { ReactNode } from 'react'

export enum Actions {
   OPEN_MOBILE_NAV = 'OPEN_MOBILE_NAV',
   CLOSE_MOBILE_NAV = 'CLOSE_MOBILE_NAV',
   TOGGLE_MOBILE_NAV = 'TOGGLE_MOBILE_NAV',
   PUSH_TOAST = 'PUSH_TOAST',
   REMOVE_TOAST = 'REMOVE_TOAST'
}

export type ToastType = {
   type: 'success' | 'error' | 'warning'
   text: string
}

export interface State {
   mobileNavState: boolean
   toasts: ToastType[]
}

export type Action = {
   type: Actions
   data?: any
}

export type UIContextType = State & {
   openMobileNav: () => void
   closeMobileNav: () => void
   toggleMobileNav: () => void
   pushToast: (toast: ToastType) => void
   removeToast: (index: number) => void
}

export type UIProviderProps = {
   children: ReactNode
}
