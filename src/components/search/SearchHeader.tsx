import { SearchFilters, SearchInput, SearchProviderFilter, SearchSort } from '@components/search'
import { app, config, routes, test } from '@constants/index'
import { useBreakpoints } from '@hooks/useBreakpoints'
import IconCross from '@icons/cross.svg'
import IconPremium from '@icons/premium.svg'
import { filterFilled, formatDuration, isFilled, testId, trans } from '@lib/utils'
import { SearchState } from '@pages/search'
import { SearchQueryObjectType } from '@services/searchService/types'
import { NextParsedUrlQuery } from 'next/dist/server/request-meta'
import { useRouter } from 'next/router'
import React, { FormEvent, useEffect, useMemo, useRef } from 'react'

type PropsType = {
   searchState: SearchState
}

const licenceFilter = [
   {
      value: undefined,
      label: trans('common.all')
   },
   {
      value: 'free',
      label: trans('common.free')
   },
   {
      value: 'premium',
      label: trans('common.premium'),
      icon: <IconPremium className="-mt-0.5 h-3 fill-current" />
   }
]

const SearchHeader = ({ searchState }: PropsType) => {
   let scrollY: number = 0

   const router = useRouter()
   const breakpoints = useBreakpoints()
   const assetType = app.assets[searchState.query.assetType]

   const headerRef = useRef<HTMLElement>(null)
   const formRef = useRef<HTMLFormElement>(null)
   const sortRef = useRef<HTMLDivElement>(null)
   const filtersRef = useRef<HTMLDivElement>(null)
   const searchInputRef = useRef<any>(null)

   const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const form = formRef.current as HTMLFormElement
      const formData = Object.fromEntries(new FormData(form).entries())
      const searchParams = Object.assign(searchState.query ?? {}, formData)

      for (const key in searchParams) {
         if (!isFilled(searchParams[key])) delete searchParams[key]
      }

      void router.push({
         pathname: form.action,
         query: filterFilled(searchParams) as NextParsedUrlQuery
      })
   }

   const handleLicenceFilter = (filter: any) => {
      const params = new URLSearchParams(searchState.query as never)

      if (filter.value) params.set('licence', filter.value)
      else params.delete('licence')

      void router.push({
         pathname: formRef.current?.action,
         query: params.toString()
      })
   }

   const reviseFilters = (filters: object) => {
      const ignore: (keyof SearchQueryObjectType)[] = config.searchQueryPersistentParams

      const revised = Object.entries(filters)
         .filter(([key, value]) => {
            if (ignore.includes(key as never)) return true

            if (!assetType.filters.hasOwnProperty(key)) return false

            return isFilled(value)
         })
         .sort(([a], [b]) => {
            if (a > b) return 1

            if (b > a) return -1

            return 0
         })

      return Object.fromEntries(revised)
   }

   const activeParams = useMemo(() => {
      const params = Object.entries(reviseFilters({ ...searchState.query }))
         .map(([name, value]) => {
            if (name === 'licence') return false

            if (assetType.filters.hasOwnProperty(name)) {
               const filter = assetType.filters[name]

               if (['minDuration', 'maxDuration'].includes(name)) {
                  value = formatDuration(value)

                  filter.var.name = name
                  filter.var.label = trans(`filters.duration.${name}`)
               }

               return {
                  name: filter.var.name,
                  label: filter.var.label,
                  value: filter.var.options
                     ? filter.var.options
                          ?.map((option: any) => {
                             if (typeof value === 'object')
                                for (const multipleVal of value) if (option.value === multipleVal) return option.label

                             if (option.value === value) return option.label

                             return false
                          })
                          ?.filter(Boolean)
                          .join(', ')
                     : value
               }
            }

            return false
         })
         .filter(Boolean)

      if (assetType.sort.hasOwnProperty(searchState.query.sort as string)) {
         params.push({
            name: 'sort',
            label: trans('sort.heading'),
            value: assetType.sort[searchState.query.sort as never]
         })
      }

      return params
   }, [searchState.query])

   const removeParam = (name: keyof SearchQueryObjectType) => {
      const params = new URLSearchParams(reviseFilters(searchState.query))
      const deleteParams: (keyof SearchQueryObjectType)[] = [name]

      if (name === 'people') {
         deleteParams.push('numberOfPeople', 'age', 'gender', 'ethnicity')
      }

      deleteParams.map(name => params.delete(name))

      void router.push({
         pathname: formRef.current?.action,
         query: Object.fromEntries(params.entries())
      })
   }

   const setStickyHeader = (state: boolean) => {
      const header = headerRef.current as HTMLElement

      if (state) {
         header.classList.add('sticky-header')

         document.body.style.paddingTop = `${header.clientHeight}px`
      } else {
         header.classList.remove('sticky-header')

         document.body.style.removeProperty('padding-top')
      }
   }

   const stickyHeaderEvent = () => {
      const header = headerRef.current as HTMLElement
      const boundary = header.clientHeight * 1.5
      const prevent =
         !document.querySelector('[data-headlessui-state="open"]') && !searchInputRef.current?.searchPopover

      if (window.scrollY < boundary) {
         setStickyHeader(false)
      } else if (window.scrollY < scrollY && window.scrollY > boundary) {
         setStickyHeader(true)
      } else if (prevent) {
         setStickyHeader(false)
      }

      scrollY = window.scrollY
   }

   useEffect(() => {
      window.addEventListener('scroll', stickyHeaderEvent)

      return () => {
         window.removeEventListener('scroll', stickyHeaderEvent)
      }
   }, [])

   return (
      <>
         <section ref={headerRef} className="group relative border-t border-gray-200 bg-white px-4 pt-3 shadow-sm">
            <form
               ref={formRef}
               action={routes.page.search}
               onSubmit={handleSearch}
               className="mb-2 flex items-center"
               autoComplete="off"
               data-test-id={testId(test.elements.searchForm)}
            >
               <input type="hidden" name="assetType" defaultValue={searchState.query.assetType} />

               <div className="flex items-center px-2 py-1.5 text-gray-600 max-xs:absolute max-xs:bottom-0 max-xs:right-2 max-xs:z-5 xs:h-12 xs:rounded-l-lg xs:border xs:border-r-0 xs:border-gray-300/75">
                  <SearchSort ref={sortRef} assetType={assetType} form={formRef.current} />
                  <hr className="w-4 rotate-90 border-gray-300/75 xs:mx-0.5" />
                  <SearchFilters ref={filtersRef} assetType={assetType} form={formRef.current} />
               </div>

               <SearchInput assetType={assetType} searchState={searchState} ref={searchInputRef} />
            </form>

            {isFilled(activeParams) && (
               <ul className="flex items-center gap-2 text-xs max-sm:overflow-x-auto max-sm:whitespace-nowrap max-xs:pb-2 sm:flex-wrap">
                  {activeParams.map((param: any, key) => (
                     <li
                        key={key}
                        onClick={() => removeParam(param.name)}
                        className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded bg-indigo-50 px-2 py-0.5 text-indigo-600 transition"
                     >
                        {param.label}: {param.value}
                        <IconCross className="w-1.5 fill-current" />
                     </li>
                  ))}
               </ul>
            )}

            <div className="z-3 relative flex flex-wrap justify-between xs:mt-2.5">
               <ul
                  className="flex items-center gap-1.5 xs:gap-2.5"
                  data-test-id={`${testId(test.elements.searchLicenceFilter)}`}
               >
                  {licenceFilter.map((filter, index) => (
                     <li key={index}>
                        <button
                           type="button"
                           onClick={() => handleLicenceFilter(filter)}
                           className={`flex items-center gap-2 border-b-2 px-2 pb-3 pt-2 text-sm transition hover:text-blue-600 xs:px-2.5 ${
                              searchState.query.licence === filter.value
                                 ? 'border-blue-600 text-blue-600'
                                 : 'border-transparent text-gray-600'
                           }`}
                        >
                           {filter.icon}
                           {filter.label}
                        </button>
                     </li>
                  ))}
               </ul>

               {searchState.queue && !breakpoints._xs && <SearchProviderFilter searchState={searchState} />}
            </div>
         </section>
      </>
   )
}

export default SearchHeader
