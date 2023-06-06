import { AppContext } from '@contexts/app/provider'
import type { AppContextType } from '@contexts/app/types'
import React, { useContext } from 'react'

export const useAppContext = () => {
   const context = useContext<AppContextType>(AppContext)

   if (context === undefined) {
      throw new Error(`useAppContext must be used within a AppProvider`)
   }

   return context
}
