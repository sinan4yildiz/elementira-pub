import { AppAssetType } from '@constants/app/types'
import { routes } from '@constants/index'
import { Transition } from '@headlessui/react'
import useClickOutside from '@hooks/useClickOutside'
import IconBackspace from '@icons/backspace.svg'
import IconCross from '@icons/cross.svg'
import IconSearch from '@icons/search.svg'
import IconTrendUp from '@icons/trend-up.svg'
import { AutocompleteResultsType } from '@lib/types'
import { debounce, errorHandler, filterFilled, isFilled, trans } from '@lib/utils'
import { SearchSchemaInterface } from '@models/searchModel'
import { SearchState, Status } from '@pages/search'
import { AutocompleteService, SearchService } from '@services/index'
import { SearchQueryObjectType } from '@services/searchService/types'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useRef, useState } from 'react'

type PropsType = {
   assetType: AppAssetType
   searchState: SearchState
}

const SearchInput = forwardRef(({ assetType, searchState }: PropsType, ref) => {
   const router = useRouter()
   const { status: session } = useSession()

   const searchPopoverRef = useRef(null)
   const keywordRef = useRef<HTMLInputElement>(null)

   const [searchPopover, setSearchPopover] = useState<boolean>(false)
   const [autocomplete, setAutocomplete] = useState<AutocompleteResultsType>([])
   const [recentSearches, setRecentSearches] = useState<SearchSchemaInterface[]>([])

   const onKeywordInput = debounce(async () => {
      void getAutocomplete()
   }, 150)

   const clearKeyword = () => {
      keywordRef.current!.value = ''
      keywordRef.current!.focus()

      setAutocomplete([])
   }

   const getAutocomplete = async () => {
      const input = keywordRef.current as HTMLInputElement

      if (!input?.value) {
         return setAutocomplete([])
      }

      const autocompleteService = new AutocompleteService()

      await autocompleteService
         .results({
            assetType: assetType.name,
            keyword: input.value
         })
         .then(async response => {
            setAutocomplete(await response.json())
         })
         .catch(error => {
            errorHandler(new Error(error))
         })
   }

   const getRecentSearches = async () => {
      if (session !== 'authenticated') return

      const searchService = new SearchService({} as never)

      searchService
         .recentSearches(assetType.name)
         .then(async response => {
            setRecentSearches(await response.json())
         })
         .catch(error => {
            errorHandler(new Error(error))
         })
   }

   const clearRecentSearches = async () => {
      if (!confirm(trans('common.areYouSure'))) return

      setRecentSearches([])

      const searchService = new SearchService({} as never)

      await searchService
         .clearRecentSearches(assetType.name)
         .then(() => {})
         .catch(error => {
            errorHandler(new Error(error))
         })
   }

   useEffect(() => {
      if (!isFilled(autocomplete)) {
         void getAutocomplete()
      }
   }, [])

   useEffect(() => {
      keywordRef.current!.value = searchState.query.keyword || ''

      setSearchPopover(false)
   }, [router.query])

   useEffect(() => {
      void getRecentSearches()
   }, [session])

   useEffect(() => {
      switch (searchState.status) {
         case Status.COMPLETED:
            void getRecentSearches()
            break
      }
   }, [searchState.status])

   useImperativeHandle(
      ref,
      () => {
         return {
            searchPopover
         }
      },
      [searchPopover]
   )

   useClickOutside([keywordRef, searchPopoverRef], () => setSearchPopover(false))

   return (
      <div className="relative flex-grow">
         <input
            type="search"
            name="keyword"
            placeholder={trans(`elements.${assetType.name}.searchPlaceholder`)}
            defaultValue={searchState.query.keyword}
            ref={keywordRef}
            onFocus={() => setSearchPopover(true)}
            onInput={onKeywordInput}
            className={`peer block h-12 w-full border-gray-300/75 py-3 pl-11 text-sm text-gray-600 caret-gray-400 outline-none transition placeholder:font-light placeholder:text-gray-400 focus:border-gray-300/75 focus:ring-0 ${
               searchPopover ? 'max-xs:rounded-t-lg xs:rounded-tr-lg' : 'max-xs:rounded-lg xs:rounded-r-lg'
            }`}
         />

         <button
            type="button"
            onClick={clearKeyword}
            className="absolute right-0 top-1/2 mr-2 -translate-y-1/2 rounded-md p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-blue-700 peer-placeholder-shown:hidden"
         >
            <IconBackspace className="w-5 stroke-current" />
         </button>

         {searchState.status === Status.SEARCHING ? (
            <div className="absolute left-0 top-1/2 ml-2.5 -translate-y-1/2 p-2 text-gray-600 transition peer-placeholder-shown:text-gray-400">
               <span className="spinner h-3 w-3 border border-current"></span>
            </div>
         ) : (
            <button
               type="submit"
               className="absolute left-0 top-1/2 ml-2.5 -translate-y-1/2 rounded-md p-2 text-gray-600 transition hover:bg-gray-100 hover:text-blue-700 peer-placeholder-shown:text-gray-400"
            >
               <IconSearch className="w-3 fill-current" />
            </button>
         )}

         <Transition
            as={Fragment}
            show={searchPopover}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-[98%]"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-[98%]"
         >
            <div ref={searchPopoverRef} className="absolute inset-x-0 bottom-0 z-10 translate-y-full">
               <div className="rounded-b-lg border-x border-b border-gray-300/75 bg-white px-4 pb-1 pt-4">
                  <button
                     type="button"
                     onClick={() => setSearchPopover(false)}
                     className="absolute right-2.5 top-1.5 inline-flex h-7 w-7 items-center justify-center rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 focus:ring-0"
                  >
                     <IconCross className="h-4 w-4 fill-current" />
                  </button>
                  {isFilled(autocomplete) && (
                     <div className="mb-2">
                        <h3 className="text-sm font-light text-gray-500">{trans('common.suggestedSearches')}</h3>
                        <ul className="flex gap-2.5 pb-3 pt-2 max-sm:overflow-x-auto max-sm:whitespace-nowrap sm:flex-wrap">
                           {autocomplete.slice(0, 8).map((result, key) => {
                              const keyword = (keywordRef.current as HTMLInputElement).value.toLowerCase()

                              return (
                                 <li key={key}>
                                    <Link
                                       href={{
                                          pathname: routes.page.search,
                                          query: filterFilled({
                                             assetType: assetType.name,
                                             keyword: result.keyword.toLowerCase(),
                                             providers: router.query.providers
                                          }) as never
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
                                       query: filterFilled({
                                          assetType: assetType.name,
                                          keyword: search.keyword?.toLowerCase(),
                                          providers: router.query.providers
                                       }) as never
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
                        {assetType.featuredKeywords.slice(0, 10).map((keyword, key) => (
                           <li key={key}>
                              <Link
                                 href={{
                                    pathname: routes.page.search,
                                    query: filterFilled({
                                       assetType: assetType.name,
                                       keyword: keyword.toLowerCase(),
                                       providers: router.query.providers
                                    }) as never
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
   )
})

SearchInput.displayName = 'SearchInput'

export default SearchInput
