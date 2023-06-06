import { useUIContext } from '@contexts/ui'
import { Transition } from '@headlessui/react'
import IconCheck from '@icons/check-circle-duo.svg'
import IconCross from '@icons/cross.svg'
import IconExclamation from '@icons/exclamation-circle-duo.svg'
import IconInfo from '@icons/info-circle-duo.svg'
import React, { Fragment, useEffect } from 'react'

const Toasts = () => {
   const UIContext = useUIContext()

   useEffect(() => {
      if (UIContext.toasts) {
         setTimeout(() => {
            UIContext.removeToast(0)
         }, 5000)
      }
   }, [UIContext.toasts])

   if (!UIContext.toasts.length) return <></>

   return (
      <ul className="fixed left-1/2 top-8 z-40 flex w-11/12 max-w-sm -translate-x-1/2 flex-col gap-2 md:top-24">
         {UIContext.toasts.map((toast, index) => (
            <Transition
               key={index}
               as={Fragment}
               show={true}
               appear={true}
               enter="transition ease-out duration-150"
               enterFrom="transform opacity-0 -translate-y-2"
               enterTo="transform opacity-100 translate-y-0"
            >
               <li className="flex gap-4 rounded-lg bg-slate-700 px-5 py-4 text-gray-500 shadow-lg">
                  <div className="mt-0.5 min-w-[1.5rem]">
                     {toast.type === 'success' && <IconCheck className="h-6 w-6 fill-green-400" />}
                     {toast.type === 'error' && <IconExclamation className="h-6 w-6 fill-red-400" />}
                     {toast.type === 'warning' && <IconInfo className="h-6 w-6 fill-yellow-400" />}
                  </div>
                  <div className="flex items-center text-sm font-normal text-slate-300">{toast.text}</div>
                  <button
                     type="button"
                     onClick={() => UIContext.removeToast(index)}
                     className="-mr-1 ml-auto inline-flex h-7 w-7 items-center justify-center rounded-md p-1.5 text-slate-400 transition hover:bg-slate-600 hover:text-slate-300 focus:ring-0"
                  >
                     <IconCross className="h-4 w-4 fill-current" />
                  </button>
               </li>
            </Transition>
         ))}
      </ul>
   )
}

export default Toasts
