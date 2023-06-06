import { AppAssetType } from '@constants/app/types'
import { app, routes, test } from '@constants/index'
import { Listbox, Transition } from '@headlessui/react'
import useClickOutside from '@hooks/useClickOutside'
import IconCheck from '@icons/check.svg'
import IconChevronDown from '@icons/chevron-down.svg'
import IconCross from '@icons/cross.svg'
import IconSearch from '@icons/search.svg'
import IconTrendUp from '@icons/trend-up.svg'
import { AutocompleteResultsType } from '@lib/types'
import { debounce, errorHandler, filterFilled, isFilled, testId, trans } from '@lib/utils'
import { SearchSchemaInterface } from '@models/searchModel'
import { AutocompleteService, SearchService } from '@services/index'
import { useSession } from 'next-auth/react'
import { NextParsedUrlQuery } from 'next/dist/server/request-meta'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FormEvent, Fragment, useEffect, useRef, useState } from 'react'

type PropsType = {
   assetType: SearchFormAssetType
   selectable?: boolean
   onChange?: (assetType: SearchFormAssetType) => any
}

export type SearchFormAssetType = Omit<AppAssetType, 'Providers' | 'sort'>

const SearchFormHero = ({ assetType, selectable, onChange }: PropsType) => {
   const router = useRouter()
   const keywordRef = useRef<HTMLInputElement | null>(null)
   const searchPopoverRef = useRef(null)
   const { status: session } = useSession()
   const assetTypes = Object.values(app.assets)
   const [selectedAssetType, setSelectedAssetType] = useState<SearchFormAssetType>(assetType)
   const [searchPopover, setSearchPopover] = useState<boolean>(false)
   const [recentSearches, setRecentSearches] = useState<SearchSchemaInterface[]>([])
   const [autocomplete, setAutocomplete] = useState<AutocompleteResultsType>([])

   const handleSearch = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const form = e.currentTarget
      const formData = new FormData(form)

      void router.push({
         pathname: form.action,
         query: filterFilled(Object.fromEntries(formData.entries())) as NextParsedUrlQuery
      })
   }

   const clearRecentSearches = async () => {
      if (!confirm(trans('common.areYouSure'))) return

      setRecentSearches([])

      const searchService = new SearchService({} as never)

      await searchService
         .clearRecentSearches(selectedAssetType.name)
         .then(() => {})
         .catch(error => {
            errorHandler(new Error(error))
         })
   }

   const handleAutocomplete = debounce(async (e: FormEvent<HTMLInputElement>) => {
      const input = e.target as HTMLInputElement

      if (!input.value) {
         return setAutocomplete([])
      }

      const autocompleteService = new AutocompleteService()

      await autocompleteService
         .results({
            assetType: selectedAssetType.name,
            keyword: input.value
         })
         .then(async response => {
            setAutocomplete(await response.json())
         })
         .catch(error => {
            errorHandler(new Error(error))
         })
   }, 150)

   useEffect(() => {
      if (session !== 'authenticated') return
      ;(async () => {
         const searchService = new SearchService({} as never)

         await searchService
            .recentSearches(selectedAssetType.name)
            .then(async response => {
               setRecentSearches(await response.json())
            })
            .catch(error => {
               errorHandler(new Error(error))
            })
      })()

      if (onChange) onChange(selectedAssetType)
   }, [session, selectedAssetType])

   useClickOutside([keywordRef, searchPopoverRef], () => setSearchPopover(false))

   return (
      <>
         <form
            action={routes.page.search}
            method="get"
            onSubmit={handleSearch}
            className="relative"
            autoComplete="off"
            data-test-id={testId(test.elements.searchForm)}
         >
            <input type="hidden" name="assetType" value={selectedAssetType.name} />

            <div className="relative">
               <div>
                  <input
                     ref={keywordRef}
                     type="search"
                     name="keyword"
                     placeholder={trans(`elements.${selectedAssetType.name}.searchPlaceholder`)}
                     onFocus={() => setSearchPopover(true)}
                     onInput={handleAutocomplete}
                     className="peer block w-full rounded-xl border-none py-6 pl-14 pr-4 text-slate-500 caret-gray-400 shadow-sm outline-none transition placeholder:font-light placeholder:text-gray-500/75 focus:ring-0 xs:pl-16"
                  />

                  <button
                     type="submit"
                     className="absolute left-0 top-1/2 ml-3 -translate-y-1/2 rounded-lg p-3 text-slate-500 transition hover:bg-gray-100 hover:text-blue-600 peer-placeholder-shown:text-gray-400 xs:ml-4"
                  >
                     <IconSearch className="w-4 fill-current" />
                  </button>

                  {selectable && (
                     <div className="absolute right-0 top-1/2 z-20 mr-4 -translate-y-1/2 max-xs:hidden">
                        <Listbox value={selectedAssetType} onChange={setSelectedAssetType}>
                           <Listbox.Button className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm text-blue-600 !outline-0 transition hover:bg-gray-100">
                              {selectedAssetType.title}
                              <IconChevronDown className="h-2.5 fill-current" />
                           </Listbox.Button>
                           <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                           >
                              <Listbox.Options className="absolute right-0 mt-2 w-44 origin-top-right rounded-lg bg-white p-3 shadow-lg ring-1 ring-gray-200 focus:outline-none">
                                 {assetTypes.map((assetTypeOption, key) => (
                                    <Listbox.Option key={key} value={assetTypeOption} as={Fragment}>
                                       {({ active, selected }) => (
                                          <li
                                             className={`
                                                block flex cursor-pointer items-center justify-between whitespace-nowrap rounded-md px-2 py-1.5 text-sm transition hover:bg-gray-100 hover:text-blue-600 sm:rounded-lg sm:px-3.5 sm:py-2
                                                ${selected ? 'text-blue-600' : 'text-gray-500'}
                                             `}
                                          >
                                             {assetTypeOption.title}
                                             {selected && <IconCheck className="h-2.5 w-2.5 fill-current" />}
                                          </li>
                                       )}
                                    </Listbox.Option>
                                 ))}
                              </Listbox.Options>
                           </Transition>
                        </Listbox>
                     </div>
                  )}
               </div>
               <Transition
                  show={searchPopover}
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-[98%]"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-100"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-[98%]"
               >
                  <div ref={searchPopoverRef} className="absolute inset-x-0 bottom-0 z-10 translate-y-full">
                     <div className="mt-1.5 rounded-lg bg-white px-6 pb-3 pt-6 shadow-sm">
                        <button
                           type="button"
                           onClick={() => setSearchPopover(false)}
                           className="absolute right-2.5 top-4 inline-flex h-7 w-7 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700 focus:ring-0"
                        >
                           <IconCross className="h-4 w-4 fill-current" />
                        </button>

                        {isFilled(autocomplete) && (
                           <div className="mb-2" data-test-id={testId(test.elements.searchFormAutocomplete)}>
                              <h3 className="text-sm font-light text-gray-500">{trans('common.suggestedSearches')}</h3>
                              <ul className="flex gap-2.5 pb-3 pt-2 max-sm:overflow-x-auto max-sm:whitespace-nowrap sm:flex-wrap">
                                 {autocomplete.slice(0, 8).map((result, key) => {
                                    const keyword = (keywordRef.current as HTMLInputElement).value.toLowerCase()

                                    return (
                                       <li key={key}>
                                          <Link
                                             href={{
                                                pathname: routes.page.search,
                                                query: {
                                                   assetType: selectedAssetType.name,
                                                   keyword: result.keyword.toLowerCase()
                                                }
                                             }}
                                             rel="nofollow"
                                             className="whitespace-nowrap rounded bg-gray-100 px-2.5 py-1.5 text-int font-light leading-8 text-gray-700 transition hover:bg-gray-200"
                                             dangerouslySetInnerHTML={{
                                                __html: result.keyword.replace(
                                                   keyword,
                                                   `<span class="text-blue-600 font-medium">${keyword}</span>`
                                                )
                                             }}
                                          ></Link>
                                       </li>
                                    )
                                 })}
                              </ul>
                           </div>
                        )}

                        {isFilled(recentSearches) && (
                           <div className="mb-2">
                              <div className="flex items-center gap-2">
                                 <h3 className="text-sm font-light text-gray-500">{trans('common.recentSearches')}</h3>
                                 <span className="text-xs font-light text-gray-400">-</span>
                                 <button
                                    type="button"
                                    onClick={clearRecentSearches}
                                    className="text-xs font-light text-gray-500 transition hover:text-red-600"
                                 >
                                    {trans('common.clear')}
                                 </button>
                              </div>
                              <ul className="flex gap-2.5 pb-3 pt-2 max-sm:overflow-x-auto max-sm:whitespace-nowrap sm:flex-wrap">
                                 {recentSearches.map((search, key) => (
                                    <li key={key}>
                                       <Link
                                          href={{
                                             pathname: routes.page.search,
                                             query: {
                                                assetType: selectedAssetType.name,
                                                keyword: search.keyword?.toLowerCase()
                                             }
                                          }}
                                          rel="nofollow"
                                          className="whitespace-nowrap rounded bg-gray-100 px-2.5 py-1.5 text-int font-light leading-8 text-gray-700 transition hover:bg-gray-200"
                                       >
                                          {search.keyword}
                                       </Link>
                                    </li>
                                 ))}
                              </ul>
                           </div>
                        )}

                        <div>
                           <h3 className="flex items-center gap-2.5 text-sm font-light text-gray-500">
                              {trans('common.trendingSearches')}
                              <IconTrendUp className="w-3.5 fill-current" />
                           </h3>
                           <ul className="flex gap-2.5 pb-3 pt-2 max-sm:overflow-x-auto max-sm:whitespace-nowrap sm:flex-wrap">
                              {selectedAssetType.featuredKeywords.slice(0, 10).map((keyword, key) => (
                                 <li key={key}>
                                    <Link
                                       href={{
                                          pathname: routes.page.search,
                                          query: {
                                             assetType: selectedAssetType.name,
                                             keyword: keyword.toLowerCase()
                                          }
                                       }}
                                       rel="nofollow"
                                       className="whitespace-nowrap rounded bg-gray-100 px-2.5 py-1.5 text-int font-light leading-8 text-gray-700 transition hover:bg-gray-200"
                                    >
                                       {keyword}
                                    </Link>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </div>
                  </div>
               </Transition>
            </div>

            {selectable && (
               <div className="mt-3 flex items-center gap-4 rounded-lg bg-gray-200 px-6 py-1 xs:hidden">
                  <span className="whitespace-nowrap text-int text-gray-500">{trans('common.searchFor')}</span>
                  <ul className="flex items-center gap-4 overflow-x-auto whitespace-nowrap py-3 text-int">
                     {assetTypes.map((assetTypeOption, key) => (
                        <li
                           key={key}
                           className={`flex items-center gap-2 ${
                              selectedAssetType.name === assetTypeOption.name ? 'text-blue-600' : 'text-gray-600'
                           }`}
                           onClick={() => setSelectedAssetType(assetTypeOption)}
                        >
                           {assetTypeOption.title}
                           {selectedAssetType.name === assetTypeOption.name && (
                              <IconCheck className="h-2.5 w-2.5 fill-current" />
                           )}
                        </li>
                     ))}
                  </ul>
               </div>
            )}
         </form>

         <div className="px-2">
            <ul
               className={`flex items-center gap-3 py-2 max-sm:overflow-x-auto ${
                  selectable ? 'max-xs:hidden sm:justify-center' : ''
               }`}
            >
               <li>
                  <IconTrendUp className={`mt-0.5 w-4 ${selectable ? 'fill-gray-500' : 'fill-white'}`} />
               </li>
               {selectedAssetType.featuredKeywords.map((keyword, key) => (
                  <li key={key}>
                     <Link
                        href={{
                           pathname: routes.page.search,
                           query: {
                              assetType: selectedAssetType.name,
                              keyword: keyword.toLowerCase()
                           }
                        }}
                        rel="nofollow"
                        className={`border-b border-transparent text-sm font-light transition ${
                           selectable ? 'text-gray-600 hover:border-gray-600' : 'text-white hover:border-current'
                        }`}
                     >
                        {keyword}
                     </Link>
                  </li>
               ))}
            </ul>
         </div>
      </>
   )
}

export default SearchFormHero
