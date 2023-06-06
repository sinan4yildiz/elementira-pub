import { templateCategoryFilter } from '@components/search/templates/filters/objects'
import { Listbox } from '@headlessui/react'
import IconCheck from '@icons/check.svg'
import IconChevronDown from '@icons/chevron-down.svg'
import { trans } from '@lib/utils'
import { useRouter } from 'next/router'
import React, { Fragment, useState } from 'react'

const { name, label, options } = templateCategoryFilter

const CategoryFilter = () => {
   const { query } = useRouter()
   const [current, setCurrent] = useState(query.category ? query.category.toString().split(',') : [])

   const onOptionsChange = (selected: []) => {
      setCurrent(selected)
   }

   function SelectButton() {
      if (current.length) {
         return (
            <ul className="flex flex-wrap items-center gap-1.5 px-3 py-2.5 pr-2 text-xs">
               {options?.map(option => {
                  if (current.includes(option.value)) {
                     return (
                        <li key={option.value} className="rounded bg-blue-600 px-2 py-1 text-white">
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
         {!!current.length && <input type="hidden" name={name} value={current} />}
         <Listbox value={current} onChange={onOptionsChange} multiple>
            <Listbox.Button className="flex w-full items-center justify-between rounded-md bg-gray-100 text-sm text-gray-500 transition hover:text-blue-600 active:bg-gray-200/75">
               <SelectButton />
               <IconChevronDown className="mr-4 h-2.5 w-2.5 min-w-[.625rem] fill-current" />
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

export default CategoryFilter
