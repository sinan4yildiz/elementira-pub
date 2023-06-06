import { UIContext } from '@contexts/ui/provider'
import type { UIContextType } from '@contexts/ui/types'
import React, { useContext } from 'react'

export const useUIContext = () => {
   const context = useContext<UIContextType>(UIContext)

   if (context === undefined) {
      throw new Error(`useUIContext must be used within a UIProvider`)
   }

   return context
}
