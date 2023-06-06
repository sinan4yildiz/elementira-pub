import { trans } from '@lib/utils'
import React, { InputHTMLAttributes, useState } from 'react'

interface PropsInterface extends InputHTMLAttributes<HTMLInputElement> {
   defaultValue?: any
   floatingLabel?: boolean
   error?: string | undefined
   onChange?: (...args: any[]) => any
}

const Input = ({ floatingLabel, error, className, children, onChange, type, ...rest }: PropsInterface) => {
   const [inputType, setInputType] = useState(type || 'text')

   const handleOnChange = (e: any) => {
      if (onChange) {
         onChange(e.target.value)
      }
   }

   const inputClasses = [
      'block px-4 pb-3.5 pt-4 w-full text-sm text-gray-800 placeholder-gray-500/75 bg-white rounded-lg border-1',
      '!outline-none !ring-0 peer duration-300 appearance-none'
   ]

   const labelClasses = ['text-sm font-normal duration-300']

   if (floatingLabel) {
      inputClasses.push('focus:border-blue-600')

      labelClasses.push(
         'absolute bg-white rounded px-2 py-0.5 top-1.5 left-3 -translate-y-4 scale-90 z-1 origin-[0] cursor-text',
         'peer-focus:text-blue-600 peer-focus:px-2 peer-focus:top-1.5 peer-focus:-translate-y-4 peer-focus:scale-90',
         'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100'
      )
   } else {
      inputClasses.push('focus:border-gray-300')

      labelClasses.push('mb-1 ml-1')
   }

   if (className) inputClasses.push(className)

   if (error) {
      inputClasses.push('border-red-400')
      labelClasses.push('text-red-500')
   } else {
      inputClasses.push('border-gray-300')
      labelClasses.push('text-gray-500/75')
   }

   return (
      <>
         <div className="relative flex flex-col flex-col-reverse">
            <input type={inputType} onChange={handleOnChange} className={inputClasses.join(' ')} {...rest} />
            {children && (
               <label htmlFor={rest.id} className={labelClasses.join(' ')}>
                  {children}
               </label>
            )}
            {type === 'password' && (
               <button
                  type="button"
                  onClick={() => setInputType(inputType === 'password' ? 'text' : 'password')}
                  className="absolute bottom-2.5 right-2 rounded-md px-3 py-2 text-xs uppercase text-gray-400 transition hover:bg-gray-100 hover:text-black"
               >
                  {inputType === 'password' ? trans('common.show') : trans('common.hide')}
               </button>
            )}
         </div>
         {error && <small className="ml-1 text-red-500">{error}</small>}
      </>
   )
}

export default Input
