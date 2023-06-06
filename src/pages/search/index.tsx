import { Meta } from '@components/common'
import { SearchHeader, SearchResults } from '@components/search'
import { app, config } from '@constants/index'
import { AnySearchResultsAssetType, AnySearchResultsType } from '@lib/types'
import { errorHandler, isFilled, isTrue, sumArr, titleCase, trans } from '@lib/utils'
import Error404 from '@pages/404'
import { SearchService } from '@services/index'
import { SearchQueryObjectType, SearchServiceQueueType } from '@services/searchService/types'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'

export enum Status {
   INITIAL = 'INITIAL',
   SEARCHING = 'SEARCHING',
   COMPLETED = 'COMPLETED',
   NO_RESULT = 'NO_RESULT',
   LOADING_MORE = 'LOADING_MORE',
   NO_MORE = 'NO_MORE'
}

type PropsType = {}

export type SearchState<ResultsType = AnySearchResultsType[], AssetsType = AnySearchResultsAssetType[]> = {
   status: Status
   query: SearchQueryObjectType
   queue: SearchServiceQueueType | undefined
   results: ResultsType
   assets: AssetsType
   total: number
}

export const initialSearchState: SearchState = {
   status: Status.INITIAL,
   query: undefined as never,
   queue: undefined,
   results: [],
   assets: [],
   total: 0
}

const PageSearch = ({}: PropsType) => {
   const router = useRouter()
   const assetsPerPage: number = config.search.assetsPerPage

   const abortController = useRef<AbortController>()
   const assetsPerProvider = useRef<number>(assetsPerPage)

   const [notFound, setNotfound] = useState<boolean>(false)
   const [searchState, setSearchState] = useState<SearchState>(initialSearchState)

   const getSearchResults = async () => {
      const searchService = new SearchService({
         searchQuery: searchState.query,
         assetType: searchState.query.assetType
      })

      const queue = searchService.queue

      const matchedProviders = Object.entries(queue.matched).filter(([name, provider]) => {
         if (!isFilled(searchState.query.providers)) return true

         return searchState.query.providers?.includes(name)
      })

      const perProvider = Math.ceil(assetsPerPage / matchedProviders.length)

      assetsPerProvider.current = perProvider > 15 ? perProvider : 15

      setSearchState(current => {
         return {
            ...current,
            queue: queue,
            status: isFilled(matchedProviders) ? Status.SEARCHING : Status.NO_RESULT
         }
      })

      const searchRequests = matchedProviders
         .map(([name, provider]) => {
            searchService.provider = provider
            searchService.signal = abortController.current!.signal

            return new Promise((resolve, reject) => {
               searchService.results().then(async response => {
                  try {
                     const results: AnySearchResultsType = await response.json()

                     resolve(results.assets.length)

                     if (results.assets.length) {
                        results.assets = filterAssets(results.assets) as []

                        setSearchState(current => {
                           return {
                              ...current,
                              results: [...current.results, results],
                              assets: [...current.assets, results.assets.splice(0, assetsPerProvider.current)].flat(),
                              total: current.total + (results.meta.totalAssets || 0)
                           }
                        })
                     }
                  } catch (error: any) {
                     resolve(0)

                     errorHandler(new Error(error), 'E501')
                  }
               })
            })
         })
         .filter(Boolean)

      if (searchRequests.length) {
         Promise.all(searchRequests).then(results => {
            const total = sumArr(results as never)

            setSearchState(current => {
               return {
                  ...current,
                  status: total ? Status.COMPLETED : Status.NO_RESULT
               }
            })
         })
      }
   }

   const handleLoadMore = async () => {
      setSearchState(current => {
         return {
            ...current,
            status: Status.LOADING_MORE
         }
      })

      const searchRequests = searchState.results.map((searchResult, searchResultIndex) => {
         const provider = app.assets[searchState.query.assetType].providers[searchResult.provider as never]

         return new Promise((resolve, reject) => {
            // Get results from provider
            if (searchResult.assets.length < assetsPerProvider.current) {
               const searchService = new SearchService({
                  searchQuery: {
                     ...searchState.query,
                     page: searchResult.meta.currentPage + 1
                  },
                  assetType: searchState.query.assetType
               })

               searchService.provider = provider
               searchService.signal = abortController.current!.signal

               searchService.results().then(async response => {
                  try {
                     const results: AnySearchResultsType = await response.json()

                     resolve(results.assets.length)

                     if (results.assets.length) {
                        results.assets = filterAssets([...searchResult.assets, ...results.assets]) as []

                        const nextAssets = results.assets.splice(0, assetsPerProvider.current)

                        searchState.results[searchResultIndex] = results

                        setSearchState(current => {
                           return {
                              ...current,
                              results: searchState.results,
                              assets: [...current.assets, nextAssets].flat()
                           }
                        })
                     } else {
                        searchState.results.splice(searchResultIndex)
                     }
                  } catch (error: any) {
                     resolve(0)

                     errorHandler(new Error(error), 'E502')
                  }
               })
            }

            // Get results from current state
            else {
               setSearchState(current => {
                  return {
                     ...current,
                     assets: [...current.assets, searchResult.assets.splice(0, assetsPerProvider.current)].flat()
                  }
               })

               resolve(assetsPerProvider.current)
            }
         })
      })

      if (searchRequests.length) {
         Promise.all(searchRequests).then(results => {
            const total = sumArr(results as never)

            setSearchState(current => {
               return {
                  ...current,
                  status: total ? Status.COMPLETED : Status.NO_MORE
               }
            })
         })
      }
   }

   const filterAssets = (assets: AnySearchResultsAssetType[]) => {
      return assets.filter(asset => {
         if (searchState.query.licence === 'free' && isTrue(asset.premium)) return false
         else if (searchState.query.licence === 'premium' && !isTrue(asset.premium)) return false

         return true
      })
   }

   const reviseSearchQuery = (searchQuery: SearchQueryObjectType) => {
      for (const param in { ...searchQuery }) {
         if (
            (!app.assets[searchQuery.assetType].filters[param]?.multiple && param !== 'providers') ||
            typeof searchQuery[param as never] !== 'string'
         ) {
            continue
         }

         // @ts-ignore
         searchQuery[param] = searchQuery[param].split(',')
      }

      return searchQuery
   }

   useEffect(() => {
      if (!router.isReady) return

      if (!isFilled(router.query) || !app.assets.hasOwnProperty(router.query.assetType as string))
         return setNotfound(true)

      abortController.current = new AbortController()

      setSearchState(current => {
         return {
            ...current,
            query: reviseSearchQuery(router.query as never)
         }
      })

      return () => {
         abortController.current!.abort()

         setSearchState(initialSearchState)
      }
   }, [router.query])

   useEffect(() => {
      if (isFilled(searchState.query)) void getSearchResults()
   }, [searchState.query])

   if (notFound) return <Error404 />

   if (searchState.status === Status.INITIAL) return <></>

   return (
      <>
         <Meta
            title={trans(`pages.search.metaTitle.${searchState.query.assetType}`, {
               count: searchState.total.toLocaleString(),
               keyword: ` ${titleCase(searchState.query.keyword ?? '')}`
            })}
            description={trans(`pages.search.metaDescription.${searchState.query.assetType}`, {
               count: searchState.total.toLocaleString(),
               keyword: titleCase(searchState.query.keyword ?? '')
            })}
            robots="noindex"
         />
         <SearchHeader searchState={searchState} />
         <SearchResults searchState={searchState} handleLoadMore={handleLoadMore} />
      </>
   )
}

export default PageSearch
