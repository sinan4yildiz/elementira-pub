import { AppAssetType } from '@constants/app/types'
import { Popover, Transition } from '@headlessui/react'
import IconCheck from '@icons/check.svg'
import IconCross from '@icons/cross.svg'
import IconSort from '@icons/sort.svg'
import { trans } from '@lib/utils'
import { useRouter } from 'next/router'
import React, { forwardRef, Fragment, useEffect, useState } from 'react'

type PropsType = {
   assetType: AppAssetType
   form: HTMLFormElement | null
}

const SearchSort = ({ assetType, form }: PropsType, ref: React.Ref<any>) => {
   const router = useRouter()
   const [active, setActive] = useState(router.query.sort)

   const handleSort = (key: string) => {
      if (!form) {
         return
      }

      const params = new URLSearchParams(router.query as never)

      if (key === active) {
         params.delete('sort')
      } else {
         params.set('sort', key)
      }

      void router.push({
         pathname: form.action,
         query: params.toString()
      })
   }

   useEffect(() => {
      setActive(router.query.sort as string)
   }, [router.query.sort])

   return (
      <Popover ref={ref} className="relative">
         {({ open }) => (
            <>
               <Popover.Button className="flex items-center gap-2 rounded-md px-2.5 py-2.5 text-center text-sm !outline-none transition hover:bg-gray-100 hover:text-blue-600 xs:py-1.5">
                  <IconSort className="w-4 fill-current xs:w-3.5" />
                  <span className="max-xs:sr-only">{trans('common.sort')}</span>
               </Popover.Button>
               {assetType.sort.hasOwnProperty(active as string) && (
                  <input type="hidden" name="sort" defaultValue={active} />
               )}
               <Popover.Overlay className="fixed inset-0 z-30 bg-black opacity-30" />
               <Transition
                  show={open}
                  as={Fragment}
                  unmount={false}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
               >
                  <Popover.Panel
                     unmount={false}
                     className="absolute z-40 mt-3 w-52 origin-top-left rounded-md bg-white p-3 shadow-lg max-xs:right-0 xs:left-0"
                  >
                     {({ close }) => (
                        <>
                           <div className="flex h-7 items-center justify-between px-2.5">
                              <h3 className="text-sm text-gray-500">{trans('sort.heading')}</h3>
                              <button
                                 type="button"
                                 onClick={() => close()}
                                 className="-mr-2 ml-auto inline-flex h-7 w-7 items-center justify-center rounded-md bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 focus:ring-0"
                              >
                                 <IconCross className="h-4 w-4 fill-current" />
                              </button>
                           </div>
                           <hr className="-mx-3 my-2" />
                           <ul className="flex flex-col">
                              {Object.entries(assetType.sort).map(([key, label]) => (
                                 <li
                                    key={key}
                                    onClick={() => {
                                       handleSort(key)
                                       close()
                                    }}
                                    className={`block flex cursor-pointer items-center justify-between whitespace-nowrap rounded-md px-2.5 py-1.5 text-sm transition hover:bg-gray-100 hover:text-blue-600 sm:rounded-md ${
                                       active === key ? 'text-blue-600' : 'text-gray-500'
                                    }`}
                                 >
                                    {label} {active === key && <IconCheck className="h-3 w-3 fill-current" />}
                                 </li>
                              ))}
                           </ul>
                        </>
                     )}
                  </Popover.Panel>
               </Transition>
            </>
         )}
      </Popover>
   )
}

export default forwardRef(SearchSort)
