import { CollectionModal } from '@components/modals'
import { SearchProviderFilter } from '@components/search/index'
import { AppAssetsType } from '@constants/app/types'
import { routes, test } from '@constants/index'
import { useUIContext } from '@contexts/ui'
import { useBreakpoints } from '@hooks/useBreakpoints'
import { AnySearchResultsAssetType, RelatedKeywordsResultsType } from '@lib/types'
import { errorHandler, filterFilled, isFilled, testId, titleCase, trans } from '@lib/utils'
import { SearchState, Status } from '@pages/search'
import { CollectionType } from '@services/collectionService/types'
import { CollectionService, LikeService, RelatedKeywordService } from '@services/index'
import { LikedAssetType } from '@services/likeService/types'
import { SearchQueryObjectType } from '@services/searchService/types'
import EmptySVG from '@svg/empty.svg'
import { useSession } from 'next-auth/react'
import { NextParsedUrlQuery } from 'next/dist/server/request-meta'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useRef, useState } from 'react'

type PropsType = {
   searchState: SearchState
   handleLoadMore: () => void
}

const ResultLayouts: { [K in keyof AppAssetsType]: any } = {
   images: dynamic(() => import('@components/search/images/ImageResults'), {
      ssr: false
   }),
   video: dynamic(() => import('@components/search/video/VideoResults'), {
      ssr: false
   }),
   music: dynamic(() => import('@components/search/music/MusicResults'), {
      ssr: false
   }),
   soundEffects: dynamic(() => import('@components/search/soundEffects/SoundEffectResults'), {
      ssr: false
   }),
   graphics: dynamic(() => import('@components/search/graphics/GraphicResults'), {
      ssr: false
   }),
   templates: dynamic(() => import('@components/search/templates/TemplateResults'), {
      ssr: false
   })
}

const SearchResults = ({ searchState, handleLoadMore }: PropsType) => {
   const router = useRouter()
   const UIContext = useUIContext()
   const { status: session } = useSession()
   const breakpoints = useBreakpoints()

   const saveAssetModalRef = useRef<any>(null)

   const [saveAsset, setSaveAsset] = useState<AnySearchResultsAssetType>()
   const [likedAssets, setLikedAssets] = useState<LikedAssetType[]>([])
   const [collections, setCollections] = useState<CollectionType[]>([])
   const [relatedKeywords, setRelatedKeywords] = useState<RelatedKeywordsResultsType>([])

   const handleSave = async ({ asset }: any) => {
      if (session !== 'authenticated') {
         UIContext.pushToast({
            type: 'warning',
            text: trans('errors.unauthorized')
         })

         return
      }

      setSaveAsset(asset)
      saveAssetModalRef.current?.setIsOpen(true)
   }

   const handleLike = async ({ asset }: any) => {
      if (session !== 'authenticated') {
         UIContext.pushToast({
            type: 'warning',
            text: trans('errors.unauthorized')
         })

         return
      }

      const likeService = new LikeService()

      await likeService
         .toggle({
            assetType: searchState.query.assetType,
            asset: asset
         })
         .then(async response => {
            switch (response.status) {
               case 200:
                  setLikedAssets(await response.json())
                  break

               case 401:
                  UIContext.pushToast({
                     type: 'warning',
                     text: trans('errors.unauthorized')
                  })
                  break

               default:
                  UIContext.pushToast({
                     type: 'error',
                     text: trans('errors.generic')
                  })
            }
         })
         .catch(error => {
            errorHandler(new Error(error))

            UIContext.pushToast({
               type: 'error',
               text: trans('errors.generic')
            })
         })
   }

   const getCollections = async () => {
      const collectionService = new CollectionService()

      collectionService
         .list(searchState.query.assetType)
         .then(async response => {
            setCollections(await response.json())
         })
         .catch(error => {
            errorHandler(new Error(error))
         })
   }

   const getLikedAssets = async () => {
      const likeService = new LikeService()

      likeService
         .list(searchState.query.assetType)
         .then(async response => {
            setLikedAssets(await response.json())
         })
         .catch(error => {
            errorHandler(new Error(error))
         })
   }

   const getRelatedKeywords = async () => {
      if (!searchState.query.keyword) {
         return setRelatedKeywords([])
      }

      const relatedKeywordsService = new RelatedKeywordService()

      await relatedKeywordsService
         .results({
            assetType: searchState.query.assetType,
            keyword: searchState.query.keyword
         })
         .then(async response => {
            setRelatedKeywords(await response.json())
         })
         .catch(error => {
            errorHandler(new Error(error))
         })
   }

   const clearFilters = () => {
      void router.push({
         pathname: routes.page.search,
         query: filterFilled({
            assetType: searchState.query.assetType,
            keyword: searchState.query.keyword
         }) as NextParsedUrlQuery
      })
   }

   useEffect(() => {
      void getRelatedKeywords()
   }, [searchState.query.keyword])

   useEffect(() => {
      if (session === 'authenticated') {
         void getCollections()
         void getLikedAssets()
      }

      if (session === 'unauthenticated') {
         setLikedAssets([])
         setCollections([])
      }
   }, [session])

   if (searchState.status === Status.SEARCHING && !searchState.assets.length)
      return (
         <article className="mt-12 flex flex-col items-center gap-3">
            <div className="flex items-center justify-center gap-3 text-sm font-light text-gray-500">
               {trans('common.searching')}
            </div>
            <div className="loading-bar w-48 ring-transparent after:bg-blue-600"></div>
         </article>
      )

   if (searchState.status === Status.NO_RESULT)
      return (
         <article className="mt-8 flex flex-col items-center gap-4">
            <EmptySVG className="h-32 sm:h-64" />
            <div className="text-center">
               <h2 className="mb-1 text-xl font-semibold text-black">{trans('pages.search.noResult')}</h2>
               <p className="mb-6 text-md font-light text-gray-600">{trans('pages.search.suggestion')}</p>
               <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-md bg-indigo-500 px-4 py-2 text-center text-sm text-white transition hover:bg-indigo-400"
               >
                  {trans('common.clearFilters')}
               </button>
            </div>
         </article>
      )

   return (
      <section className="mb-10 p-4" data-test-id={testId(test.elements.searchResults)}>
         {searchState.queue && breakpoints._xs && <SearchProviderFilter searchState={searchState} />}

         {isFilled(searchState.assets) && (
            <h1 className="mb-3 text-int font-light text-gray-800 xs:text-sm">
               {searchState.query.keyword ? (
                  <span
                     dangerouslySetInnerHTML={{
                        __html: trans(`elements.${searchState.query.assetType}.searchResultMessage`, {
                           count: searchState.total.toLocaleString(),
                           keyword: `<strong class="text-blue-600">${titleCase(
                              searchState.query.keyword ?? ''
                           )}</strong>`
                        })
                     }}
                  ></span>
               ) : (
                  <span
                     dangerouslySetInnerHTML={{
                        __html: trans(`elements.${searchState.query.assetType}.searchResultMessageSimple`, {
                           count: `<strong class="text-blue-600">${searchState.total.toLocaleString()}</strong>`
                        })
                     }}
                  ></span>
               )}
            </h1>
         )}

         {isFilled(relatedKeywords) && isFilled(searchState.assets) && (
            <ul
               className="mb-2 flex gap-2.5 pb-3 max-sm:overflow-x-auto max-sm:whitespace-nowrap sm:flex-wrap"
               data-test-id={testId(test.elements.searchRelatedKeywords)}
            >
               {relatedKeywords.slice(0, 20).map((result, key) => {
                  return (
                     <li key={key}>
                        <Link
                           href={{
                              pathname: routes.page.search,
                              query: filterFilled({
                                 assetType: searchState.query.assetType,
                                 keyword: result.keyword,
                                 providers: router.query.providers
                              }) as never
                           }}
                           rel="nofollow"
                           className="whitespace-nowrap rounded bg-gray-200 px-2.5 py-1.5 text-int font-light leading-8 text-gray-800 transition hover:bg-gray-300/75 hover:text-black"
                        >
                           {result.keyword}
                        </Link>
                     </li>
                  )
               })}
            </ul>
         )}

         {Object.entries(ResultLayouts).map(([layoutName, SearchResultsComponent]) => {
            if (layoutName === searchState.query.assetType)
               return (
                  <Fragment key={layoutName}>
                     <SearchResultsComponent
                        foundAssets={searchState.assets}
                        likedAssets={likedAssets}
                        handleLike={handleLike}
                        collections={collections}
                        handleSave={handleSave}
                     />

                     {searchState.assets.length > 10 && searchState.status !== Status.NO_MORE && (
                        <div className="flex justify-center">
                           <button
                              type="button"
                              onClick={handleLoadMore}
                              disabled={[Status.LOADING_MORE, Status.SEARCHING].includes(searchState.status)}
                              className="flex items-center gap-2 rounded-full px-8 py-2 text-center text-sm text-gray-700 ring-1 ring-inset ring-gray-400 transition transition hover:text-black hover:ring-black"
                           >
                              {searchState.status === Status.LOADING_MORE && (
                                 <span className="spinner h-3 w-3 border border-current"></span>
                              )}
                              {trans('common.seeMore')}
                           </button>
                        </div>
                     )}
                  </Fragment>
               )
         })}
         {session === 'authenticated' && (
            <CollectionModal
               ref={saveAssetModalRef}
               assetType={searchState.query.assetType}
               saveAsset={saveAsset}
               collections={collections}
               setCollections={setCollections}
            />
         )}
      </section>
   )
}

export default SearchResults
