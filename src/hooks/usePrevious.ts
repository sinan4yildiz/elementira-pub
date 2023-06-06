import { useEffect, useRef } from 'react'

function usePrevious<T>(value: T): T {
   const ref: any = useRef<T>()

   useEffect(() => {
      ref.current = value
   }, [value]) // Only re-run if value changes

   return ref.current
}

export default usePrevious
