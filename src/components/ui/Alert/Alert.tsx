import { ThemeAlertTypeType } from '@constants/ui/types'
import IconCheck from '@icons/check-circle-duo.svg'
import IconExclamation from '@icons/exclamation-circle-duo.svg'
import IconInfo from '@icons/info-circle-duo.svg'
import React, { ReactNode } from 'react'

type PropsType = {
   type: keyof ThemeAlertTypeType
   children: ReactNode
   className?: string
}

const Alert = ({ type, className, children, ...rest }: PropsType) => {
   const alertClasses = ['flex px-5 py-4 text-sm rounded-lg']

   const types: ThemeAlertTypeType = {
      info: 'text-blue-600 bg-blue-100',
      success: 'text-green-600 bg-green-100',
      warning: 'text-orange-600 bg-orange-100',
      error: 'text-red-600 bg-red-100'
   }

   alertClasses.push(types[type])

   if (className) alertClasses.push(className)

   return (
      <div className={alertClasses.join(' ')} {...rest}>
         <span className="mr-3">
            {type === 'info' && <IconInfo className="w-5 fill-blue-600" />}
            {type === 'success' && <IconCheck className="w-5 fill-green-600" />}
            {type === 'warning' && <IconExclamation className="w-5 fill-orange-600" />}
            {type === 'error' && <IconExclamation className="w-5 fill-red-600" />}
         </span>
         {children}
      </div>
   )
}

export default Alert
