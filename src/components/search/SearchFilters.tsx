import { Button } from '@components/ui'
import { AppAssetsType, AppAssetType } from '@constants/app/types'
import { test } from '@constants/index'
import { useAppContext } from '@contexts/app'
import { Popover, Transition } from '@headlessui/react'
import IconFilters from '@icons/filters.svg'
import { isFilled, testId, trans } from '@lib/utils'
import { NextParsedUrlQuery } from 'next/dist/server/request-meta'
import { useRouter } from 'next/router'
import React, { forwardRef, Fragment, lazy, Suspense } from 'react'

type PropsType = {
   assetType: AppAssetType
   form: HTMLFormElement | null
}

const FilterGroup: { [K in keyof AppAssetsType]: any } = {
   images: lazy(() => import('./images/ImageFilters')),
   video: lazy(() => import('./video/VideoFilters')),
   music: lazy(() => import('./music/MusicFilters')),
   soundEffects: lazy(() => import('./soundEffects/SoundEffectFilters')),
   graphics: lazy(() => import('./graphics/GraphicFilters')),
   templates: lazy(() => import('./templates/TemplateFilters'))
}

const SearchFilters = ({ assetType, form }: PropsType, ref: React.Ref<any>) => {
   const router = useRouter()
   const AppContext = useAppContext()

   const handleFilter = () => {
      if (!form) {
         return
      }

      let formData = new FormData(form)

      formData.set('providers', (router.query.providers as string) || '')

      const searchQuery = Object.fromEntries(formData.entries())

      for (const key in searchQuery) {
         if (!isFilled(searchQuery[key])) delete searchQuery[key]
      }

      void router.push({
         pathname: form.action,
         query: searchQuery as NextParsedUrlQuery
      })
   }

   const resetFilters = () => {
      AppContext.resetSearchFilters({ ...router.query } as never)
   }

   return (
      <Popover ref={ref} className="relative">
         {({ open }) => (
            <>
               <Popover.Button
                  onClick={resetFilters}
                  className="flex items-center gap-2 rounded-md px-2.5 py-2.5 text-center text-sm !outline-none transition hover:bg-gray-100 hover:text-blue-600 xs:py-1.5"
                  data-test-id={testId(test.elements.searchFiltersButton)}
               >
                  <IconFilters className="w-3.5 fill-current xs:w-3" />
                  <span className="max-xs:sr-only">{trans('filters.heading')}</span>
               </Popover.Button>
               <Popover.Overlay className="fixed inset-0 z-30 bg-black opacity-30" />
               <Transition
                  show={open}
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
               >
                  <Popover.Panel className="absolute z-40 mt-3 w-[calc(100vw_-_2rem)] max-xs:right-0 max-xs:origin-top-right xs:left-4 xs:w-96 xs:origin-top-left">
                     {({ close }) => (
                        <div className="rounded-md bg-white shadow-lg">
                           <div className="flex items-center justify-between px-5 py-3">
                              <h3 className="text-md text-gray-500">{trans('filters.heading')}</h3>
                              <div className="ml-auto flex items-center gap-2">
                                 <Button onClick={() => close()} size="xs">
                                    {trans('common.close')}
                                 </Button>
                                 <Button
                                    type="button"
                                    onClick={() => {
                                       handleFilter()
                                       close()
                                    }}
                                    color="blue"
                                    size="xs"
                                 >
                                    {trans('common.apply')}
                                 </Button>
                              </div>
                           </div>
                           <hr />
                           <div className="scrollbar max-h-[60vh] overflow-y-auto">
                              <Suspense fallback={<FilterGroupSkeleton />}>
                                 {Object.entries(FilterGroup).map(
                                    ([group, Component]) =>
                                       group === assetType.name && <Component key={assetType.name} />
                                 )}
                              </Suspense>
                           </div>
                        </div>
                     )}
                  </Popover.Panel>
               </Transition>
            </>
         )}
      </Popover>
   )
}

function FilterGroupSkeleton() {
   return (
      <ul className="grid animate-pulse gap-4 p-6">
         {[...Array(5).keys()].map(key => (
            <li key={key}>
               <div className="mb-2 h-2 w-20 rounded-full bg-gray-200"></div>
               <div className="h-5 rounded-md bg-gray-200"></div>
            </li>
         ))}
      </ul>
   )
}

export default forwardRef(SearchFilters)
