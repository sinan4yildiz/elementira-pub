import { ProviderLogo } from '@components/template'
import { Button } from '@components/ui'
import { app, config, routes, test } from '@constants/index'
import { Listbox, Popover, Transition } from '@headlessui/react'
import { useBreakpoints } from '@hooks/useBreakpoints'
import IconCheck from '@icons/check.svg'
import IconChevronDown from '@icons/chevron-down.svg'
import IconPremium from '@icons/premium.svg'
import { isFilled, testId, trans } from '@lib/utils'
import { SearchState } from '@pages/search'
import { SearchQueryObjectType } from '@services/searchService/types'
import { useRouter } from 'next/router'
import React, { Fragment, useState } from 'react'

type PropsType = {
   searchState: SearchState
}

const SearchProviderFilter = ({ searchState }: PropsType) => {
   const router = useRouter()
   const breakpoints = useBreakpoints()

   const displayLimit = breakpoints._maxMd ? 4 : 7

   const matchedProviders = Object.entries(searchState.queue!.matched).filter(
      ([name]) => !searchState.query.providers?.includes(name)
   )

   const unmatchedProviders = Object.entries(searchState.queue!.unmatched)

   const selectedProviders = Object.entries(app.providers[searchState.query.assetType]).filter(
      ([name]) => searchState.query.providers?.includes(name) && !searchState.queue!.unmatched.hasOwnProperty(name)
   )

   const activeProviders = selectedProviders.length ? selectedProviders : matchedProviders

   const [current, setCurrent] = useState<string[]>([])

   const handleFilter = () => {
      const params = new URLSearchParams(router.query as never)

      if (current.length) params.set('providers', current.join())
      else params.delete('providers')

      // Clear active filters
      for (const provider of current) {
         if (searchState.queue!.unmatched.hasOwnProperty(provider)) {
            params.forEach((value, key) => {
               if (!config.searchQueryPersistentParams.includes(key as never)) {
                  params.delete(key)
               }
            })
         }
      }

      void router.push({
         pathname: routes.page.search,
         query: params.toString()
      })
   }

   const resetCurrent = () => {
      const providers = selectedProviders.filter(([name]) => {
         return searchState.queue!.matched.hasOwnProperty(name)
      })

      setCurrent(providers.map(([name]) => name))
   }

   if (!activeProviders.length) return <></>

   return (
      <Popover className="relative max-sm:mb-4">
         {({ open }) => (
            <>
               <Popover.Button
                  onClick={resetCurrent}
                  className="flex cursor-pointer items-center justify-between gap-3 rounded-md px-4 !outline-0 transition max-sm:w-full max-sm:bg-gray-200 sm:px-3 sm:hover:bg-gray-100"
                  data-test-id={testId(test.elements.searchProviderFilterButton)}
               >
                  <ul className="flex h-10 flex-nowrap items-center gap-4 max-sm:overflow-x-auto max-sm:whitespace-nowrap sm:h-8">
                     {activeProviders.slice(0, displayLimit).map(([name, provider]) => (
                        <li key={name} className="min-w-fit">
                           <ProviderLogo provider={provider.name} />
                        </li>
                     ))}
                  </ul>
                  <div
                     className={`inline-flex items-center gap-1.5 whitespace-nowrap text-xs text-gray-500 ${
                        activeProviders.length > displayLimit ? 'border-l border-gray-300 pl-3' : '-ml-0.5'
                     }`}
                  >
                     {activeProviders.length > displayLimit &&
                        trans('common.xMore', {
                           count: activeProviders.length - displayLimit
                        })}
                     <IconChevronDown className="h-2 fill-current" />
                  </div>
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
                  <Popover.Panel className="absolute right-0 z-40 mt-3 w-[calc(100vw_-_2rem)] max-xs:origin-top-right xs:w-96">
                     {({ close }) => (
                        <div className="rounded-md bg-white shadow-lg">
                           <div className="flex items-center justify-between px-5 py-3">
                              <h3 className="text-md text-gray-500">{trans('filters.providerFilter.heading')}</h3>
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
                                    data-test-id={testId(test.elements.searchProviderFilterApplyButton)}
                                 >
                                    {trans('common.apply')}
                                 </Button>
                              </div>
                           </div>
                           <hr />

                           <div className="scrollbar max-h-[60vh] overflow-y-auto">
                              <ul
                                 className="flex flex-col gap-5 p-5"
                                 data-test-id={testId(test.elements.searchProviderFilterList)}
                              >
                                 {isFilled(selectedProviders) && (
                                    <li>
                                       <div className="mb-2.5 flex items-center justify-between">
                                          <div className="pr-2">
                                             <h4 className="text-sm text-gray-600">
                                                {trans('filters.providerFilter.selected.heading')}
                                             </h4>
                                             <p className="text-xs text-gray-500">
                                                {trans('filters.providerFilter.selected.description')}
                                             </p>
                                          </div>
                                          <Button onClick={() => setCurrent([])} size="xs">
                                             {trans('common.clear')}
                                          </Button>
                                       </div>
                                       <Listbox value={current} onChange={setCurrent} multiple>
                                          <Listbox.Options static={true} className="flex flex-col gap-3">
                                             {selectedProviders.map(([name, provider]) => (
                                                <Listbox.Option key={name} value={name} as={Fragment}>
                                                   {({ active, selected }) => (
                                                      <li
                                                         className={`flex h-10 cursor-pointer select-none items-center justify-between rounded-md bg-gray-100 px-4 transition hover:bg-gray-200`}
                                                      >
                                                         <ProviderLogo
                                                            provider={provider.name}
                                                            className="ml-0.5 scale-105"
                                                         />
                                                         <div className="inline-flex items-center gap-4">
                                                            <div className="inline-flex items-center gap-3 divide-x divide-gray-400">
                                                               {provider.params.licence?.hasOwnProperty('free') && (
                                                                  <span className="text-xs text-gray-700">
                                                                     {trans('common.free')}
                                                                  </span>
                                                               )}
                                                               {provider.params.licence?.hasOwnProperty('premium') && (
                                                                  <IconPremium className="h-[11px] fill-gray-600 pl-3" />
                                                               )}
                                                            </div>
                                                            {selected && <IconCheck className="w-3 fill-blue-600" />}
                                                         </div>
                                                      </li>
                                                   )}
                                                </Listbox.Option>
                                             ))}
                                          </Listbox.Options>
                                       </Listbox>
                                    </li>
                                 )}

                                 {isFilled(matchedProviders) && (
                                    <li>
                                       <h4 className="text-sm text-gray-600">
                                          {trans('filters.providerFilter.matched.heading')}
                                       </h4>
                                       <p className="mb-2.5 text-xs text-gray-500">
                                          {trans('filters.providerFilter.matched.description')}
                                       </p>
                                       <Listbox value={current} onChange={setCurrent} multiple>
                                          <Listbox.Options static={true} className="flex flex-col gap-3">
                                             {matchedProviders.map(([name, provider]) => (
                                                <Listbox.Option key={name} value={name} as={Fragment}>
                                                   {({ active, selected }) => (
                                                      <li
                                                         className={`flex h-10 cursor-pointer select-none items-center justify-between rounded-md bg-gray-100 px-4 transition hover:bg-gray-200`}
                                                      >
                                                         <ProviderLogo
                                                            provider={provider.name}
                                                            className="ml-0.5 scale-105"
                                                         />
                                                         <div className="inline-flex items-center gap-4">
                                                            <div className="inline-flex items-center gap-3 divide-x divide-gray-400">
                                                               {provider.params.licence?.hasOwnProperty('free') && (
                                                                  <span className="text-xs text-gray-700">
                                                                     {trans('common.free')}
                                                                  </span>
                                                               )}
                                                               {provider.params.licence?.hasOwnProperty('premium') && (
                                                                  <IconPremium className="h-[11px] fill-gray-600 pl-3" />
                                                               )}
                                                            </div>
                                                            {selected && <IconCheck className="w-3 fill-blue-600" />}
                                                         </div>
                                                      </li>
                                                   )}
                                                </Listbox.Option>
                                             ))}
                                          </Listbox.Options>
                                       </Listbox>
                                    </li>
                                 )}

                                 {isFilled(unmatchedProviders) && (
                                    <li>
                                       <h4 className="text-sm text-gray-600">
                                          {trans('filters.providerFilter.unmatched.heading')}
                                       </h4>
                                       <p className="mb-2.5 text-xs text-gray-500">
                                          {trans('filters.providerFilter.unmatched.description')}
                                       </p>
                                       <Listbox value={current} onChange={setCurrent} multiple>
                                          <Listbox.Options static={true} className="flex flex-col gap-3">
                                             {unmatchedProviders.map(([name, provider]) => (
                                                <Listbox.Option key={name} value={name} as={Fragment}>
                                                   {({ active, selected }) => (
                                                      <li
                                                         className={`flex h-10 cursor-pointer select-none items-center justify-between rounded-md bg-gray-100 px-4 transition hover:bg-gray-200`}
                                                      >
                                                         <ProviderLogo
                                                            provider={provider.name}
                                                            className="ml-0.5 scale-105"
                                                         />
                                                         <div className="inline-flex items-center gap-4">
                                                            <div className="inline-flex items-center gap-3 divide-x divide-gray-400">
                                                               {provider.params.licence?.hasOwnProperty('free') && (
                                                                  <span className="text-xs text-gray-700">
                                                                     {trans('common.free')}
                                                                  </span>
                                                               )}
                                                               {provider.params.licence?.hasOwnProperty('premium') && (
                                                                  <IconPremium className="h-[11px] fill-gray-600 pl-3" />
                                                               )}
                                                            </div>
                                                            {selected && <IconCheck className="w-3 fill-blue-600" />}
                                                         </div>
                                                      </li>
                                                   )}
                                                </Listbox.Option>
                                             ))}
                                          </Listbox.Options>
                                       </Listbox>
                                    </li>
                                 )}
                              </ul>
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

export default SearchProviderFilter
