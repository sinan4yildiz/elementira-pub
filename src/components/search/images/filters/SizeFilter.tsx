import { ImageFilterType, ImageSearchParamSizeType } from '@lib/images/types'
import { trans } from '@lib/utils'
import { useRouter } from 'next/router'
import React, { ChangeEvent, MouseEvent, useState } from 'react'

export const imagesSizeFilter: ImageFilterType<ImageSearchParamSizeType> = {
   name: 'size',
   label: trans('filters.size.label'),
   options: [
      {
         value: 'small',
         label: trans('filters.size.small')
      },
      {
         value: 'xLarge',
         label: trans('filters.size.xLarge')
      },
      {
         value: 'medium',
         label: trans('filters.size.medium')
      },
      {
         value: 'xxLarge',
         label: trans('filters.size.xxLarge')
      },
      {
         value: 'large',
         label: trans('filters.size.large')
      },
      {
         value: 'xxxLarge',
         label: trans('filters.size.xxxLarge')
      }
   ]
}

const { name, label, options } = imagesSizeFilter

const SizeFilter = () => {
   const { query } = useRouter()
   const [currentValue, setCurrentValue] = useState(query.size || null)

   const onFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = e.currentTarget

      setCurrentValue(value)
   }

   const onLabelClick = (e: MouseEvent<HTMLLabelElement>) => {
      const { value, checked } = e.currentTarget.control as HTMLInputElement

      if (!checked) {
         setCurrentValue(null)
      }
   }

   return (
      <>
         <label htmlFor={`${name}-small`} className="mb-3 inline-block text-sm text-gray-500">
            {label}
         </label>
         <ul className="grid grid-cols-2 gap-3">
            {options?.map((option, key) => (
               <li key={key} className="flex items-center gap-3">
                  <input
                     onChange={onFilterChange}
                     onClick={() => setCurrentValue(null)}
                     type="radio"
                     name={name}
                     checked={currentValue === option.value}
                     value={option.value}
                     id={`${name}-${option.value}`}
                     className="peer"
                  />
                  <label
                     onClick={onLabelClick}
                     htmlFor={`${name}-${option.value}`}
                     className="flex items-center gap-3 text-sm text-gray-500 hover:text-blue-600 peer-checked:text-blue-600"
                  >
                     {option.label}
                  </label>
               </li>
            ))}
         </ul>
      </>
   )
}

export default SizeFilter
