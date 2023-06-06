import { graphicsOrientationFilter } from '@components/search/graphics/filters/objects'
import { RadioGroup } from '@headlessui/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const { name, label, options } = graphicsOrientationFilter

const OrientationFilter = () => {
   const { query } = useRouter()
   const [current, setCurrent] = useState(query.orientation || null)

   const onOptionClick = (value: any) => {
      if (current === value) {
         value = null
      }

      setCurrent(value)
   }

   return (
      <>
         <label htmlFor={`${name}-horizontal`} className="mb-3 inline-block text-sm text-gray-500">
            {label}
         </label>
         <RadioGroup
            name={name}
            value={current}
            className="grid grid-cols-2 items-center gap-2 rounded-md bg-gray-100 px-2 py-1.5 text-int"
         >
            {options?.map(option => (
               <RadioGroup.Option key={option.value} value={option.value} onClick={() => onOptionClick(option.value)}>
                  {({ active, checked }) => (
                     <div
                        className={`
                           flex cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-1.5 text-sm transition
                           ${checked ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-white hover:text-blue-600'}
                        `}
                     >
                        {option.label}
                     </div>
                  )}
               </RadioGroup.Option>
            ))}
         </RadioGroup>
      </>
   )
}

export default OrientationFilter