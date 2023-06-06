import { ThemeButtonColorsType, ThemeButtonSizesType } from '@constants/ui/types'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React, { forwardRef, ReactNode } from 'react'

interface PropsInterface extends LinkProps {
   children: ReactNode
   className?: string
   activeClassName?: string
   active?: boolean
   color?: keyof ThemeButtonColorsType
   size?: keyof ThemeButtonSizesType
}

const colors: ThemeButtonColorsType = {
   default: '',
   light: 'text-gray-600 bg-gray-100 hover:bg-gray-200/75',
   blue: 'text-white bg-blue-600 hover:bg-blue-700',
   blueLight: 'text-blue-600 bg-blue-50 hover:bg-blue-100',
   green: 'text-white bg-green-500 hover:bg-green-600',
   greenLight: 'text-green-500 bg-green-100/75 hover:bg-green-100',
   orange: 'text-white bg-orange-500 hover:bg-orange-600',
   orangeLight: 'text-orange-500 bg-orange-100/75 hover:bg-orange-100',
   red: 'text-white bg-red-500 hover:bg-red-600',
   redLight: 'text-red-500 bg-red-50 hover:bg-red-100/75',
   purple: 'text-white bg-purple-600 hover:bg-purple-700',
   purpleLight: 'text-purple-500 bg-purple-100/75 hover:bg-purple-100',
   indigo: 'text-white bg-indigo-600 hover:bg-indigo-700',
   indigoLight: 'text-indigo-500 bg-indigo-100/75 hover:bg-indigo-100'
}

const sizes: ThemeButtonSizesType = {
   xs: 'px-3.5 py-1.5 text-xs rounded-md',
   sm: 'px-6 py-2 text-sm rounded-md',
   md: 'px-7 py-2.5 text-sm rounded-lg',
   lg: 'px-9 py-3 text-sm rounded-lg',
   xl: 'px-11 py-3.5 text-md rounded-lg'
}

const A = (
   { href, color, size, className, activeClassName, active, children, ...rest }: PropsInterface,
   ref: React.Ref<HTMLAnchorElement>
) => {
   const { asPath } = useRouter()

   const classes = ['']

   if (size || color)
      classes.push(
         'inline-flex items-center transition text-center disabled:opacity-75 justify-center disabled:cursor-progress'
      )

   if ((href === asPath || active) && activeClassName) classes.push(activeClassName)

   if (color) classes.push(colors[color])

   if (size) classes.push(sizes[size])

   if (className) classes.push(className)

   return (
      <Link href={href} ref={ref} className={classes.join(' ')} {...rest}>
         {children}
      </Link>
   )
}

export default forwardRef(A)
