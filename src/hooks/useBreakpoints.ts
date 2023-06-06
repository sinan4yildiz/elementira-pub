import { useMediaQuery } from '@hooks/useMedia'

export function useBreakpoints() {
   const breakpoints = {
      _xs: useMediaQuery('(max-width: 639px)'),
      _sm: useMediaQuery('(min-width: 641px) and (max-width: 768px)'),
      _maxMd: useMediaQuery('(max-width: 1024px)'),
      _md: useMediaQuery('(min-width: 769px) and (max-width: 1024px)'),
      _lg: useMediaQuery('(min-width: 1025px)'),
      _xl: useMediaQuery('(min-width: 1281px)'),
      _2xl: useMediaQuery('(min-width: 1537px)'),
      current: 'xs'
   }

   if (breakpoints._xs) breakpoints.current = 'xs'

   if (breakpoints._sm) breakpoints.current = 'sm'

   if (breakpoints._md) breakpoints.current = 'md'

   if (breakpoints._lg) breakpoints.current = 'lg'

   if (breakpoints._xl) breakpoints.current = 'xl'

   if (breakpoints._2xl) breakpoints.current = '2xl'

   return breakpoints
}
