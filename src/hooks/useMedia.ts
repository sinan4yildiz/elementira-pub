import { useEffect, useState } from 'react'

export function useMediaQuery(query: string) {
   const [matches, setMatches] = useState(false)

   useEffect(() => {
      const mediaQuery = window.matchMedia(query)

      setMatches(mediaQuery.matches)

      const handler = (e: any) => {
         setMatches(e.matches)
      }

      mediaQuery.addEventListener('change', handler)

      return () => {
         mediaQuery.removeEventListener('change', handler)
      }
   }, [])

   return matches
}
