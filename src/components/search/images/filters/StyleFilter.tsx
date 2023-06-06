import { imagesStyleFilter } from '@components/search/images/filters/objects'
import { Listbox } from '@headlessui/react'
import IconCheck from '@icons/check.svg'
import IconChevronDown from '@icons/chevron-down.svg'
import { trans } from '@lib/utils'
import { useRouter } from 'next/router'
import React, { Fragment, useState } from 'react'

const { name, label, options } = imagesStyleFilter

const StyleFilter = () => {
   const { query } = useRouter()
   const [current, setCurrent] = useState(query.style || null)

   const onOptionChange = (value: any) => {
      if (current === value) {
         value = null
      }

      setCurrent(value)
   }

   function SelectButton() {
      if (current) {
         return (
            <>
               {options?.map(option => {
                  if (current === option.value) {
                     return (
                        <span key={option.value} className="text-blue-600">
                           {option.label}
                        </span>
                     )
                  }
               })}
            </>
         )
      }

      return <>{trans('common.select')}</>
   }

   return (
      <>
         <label className="mb-3 inline-block text-sm text-gray-500">{label}</label>
         <Listbox name={name} value={current} onChange={onOptionChange}>
            <Listbox.Button className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-sm text-gray-500 transition hover:text-blue-600 active:bg-gray-200/75">
               <SelectButton />
               <IconChevronDown className="h-2.5 w-2.5 min-w-[.625rem] fill-current" />
            </Listbox.Button>
            <Listbox.Options className="mt-1 grid grid-cols-2 rounded-md bg-gray-100 p-2">
               {options?.map(option => (
                  <Listbox.Option key={option.value} value={option.value} as={Fragment}>
                     {({ active, selected }) => (
                        <li
                           className={`
                           flex cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-1.5 text-sm transition hover:bg-white
                           ${selected ? 'text-blue-600' : 'text-gray-500'}
                        `}
                        >
                           {option.label}
                           {selected && <IconCheck className="h-2.5 w-2.5 fill-current" />}
                        </li>
                     )}
                  </Listbox.Option>
               ))}
            </Listbox.Options>
         </Listbox>
      </>
   )
}

export default StyleFilter
