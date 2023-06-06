import { imagesUsageFilter } from '@components/search/images/filters/objects'
import { RadioGroup } from '@headlessui/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const { name, label, options } = imagesUsageFilter

const UsageFilter = () => {
   const { query } = useRouter()
   const [current, setCurrent] = useState(query.usage || null)

   const onOptionClick = (value: any) => {
      if (current === value) {
         value = null
      }

      setCurrent(value)
   }

   return (
      <>
         <label className="mb-3 inline-block text-sm text-gray-500">{label}</label>
         <RadioGroup
            name={name}
            value={current}
            className="grid grid-cols-2 items-center gap-2 rounded-md bg-gray-100 px-2 py-1.5 text-int"
         >
            {options?.map(option => (
               <RadioGroup.Option key={option.value} value={option.value} onClick={() => onOptionClick(option.value)}>
                  {({ active, checked }) => (
                     <div
                        className={`relative flex h-8 cursor-pointer select-none items-center justify-center gap-2 rounded-md transition
                                    ${checked ? 'bg-blue-600 text-white' : 'hover:bg-white hover:text-blue-600'}`}
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

export default UsageFilter
