import { graphicsColorFilter } from '@components/search/graphics/filters/objects'
import { Listbox } from '@headlessui/react'
import IconCheck from '@icons/check.svg'
import IconChevronDown from '@icons/chevron-down.svg'
import { trans } from '@lib/utils'
import { useRouter } from 'next/router'
import React, { Fragment, useState } from 'react'

const { name, label, options } = graphicsColorFilter

const ColorFilter = () => {
   const { query } = useRouter()
   const [current, setCurrent] = useState(query.color || null)

   const onOptionChange = (value: any) => {
      if (current === value) {
         value = null
      }

      setCurrent(value)
   }

   function SelectButton() {
      if (current) {
         return (
            <ul className="flex items-center px-3 py-2.5 pr-2 text-xs">
               {options?.map(option => {
                  if (current === option.value) {
                     return (
                        <li
                           key={option.value}
                           className={`rounded px-3 py-1 ${option.value === 'white' ? 'text-gray-800' : 'text-white'}`}
                           style={{ backgroundColor: option.color }}
                        >
                           {option.label}
                        </li>
                     )
                  }
               })}
            </ul>
         )
      }

      return <span className="px-4 py-3">{trans('common.select')}</span>
   }

   return (
      <>
         <label className="mb-3 inline-block text-sm text-gray-500">{label}</label>
         <Listbox name={name} value={current} onChange={onOptionChange}>
            <Listbox.Button className="flex w-full items-center justify-between rounded-md bg-gray-100 text-sm text-gray-500 transition hover:text-blue-600 active:bg-gray-200/75">
               <SelectButton />
               <IconChevronDown className="mr-4 h-2.5 w-2.5 min-w-[.625rem] fill-current" />
            </Listbox.Button>
            <Listbox.Options className="mt-1 grid grid-cols-2 rounded-md bg-gray-100 p-2">
               {options?.map(option => (
                  <Listbox.Option key={option.value} value={option.value} as={Fragment}>
                     {({ active, selected }) => (
                        <li
                           className="flex cursor-pointer select-none items-center rounded-md px-2.5 py-1.5 text-sm transition hover:bg-white"
                           style={{
                              color: option.value === 'white' ? '' : option.color
                           }}
                        >
                           <span
                              className={`mr-2.5 inline-block h-3 w-3 rounded-sm ${
                                 option.value === 'white' ? 'ring-1 ring-gray-300' : ''
                              }`}
                              style={{ backgroundColor: option.color }}
                           ></span>
                           {option.label}
                           {selected && <IconCheck className="ml-auto h-2.5 w-2.5 fill-current" />}
                        </li>
                     )}
                  </Listbox.Option>
               ))}
            </Listbox.Options>
         </Listbox>
      </>
   )
}

export default ColorFilter
