import { Meta } from '@components/common'
import { CollectionModal } from '@components/modals'
import { AppAssetsType, AppAssetType, AppProvidersType } from '@constants/app/types'
import { app, routes } from '@constants/index'
import { useUIContext } from '@contexts/ui'
import { AnySearchResultsAssetType } from '@lib/types'
import { errorHandler, trans } from '@lib/utils'
import { CollectionType } from '@services/collectionService/types'
import { CollectionService, LikeService } from '@services/index'
import EmptySVG from '@svg/empty.svg'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useRef, useState } from 'react'

enum Status {
   LOADING = 'LOADING',
   COMPLETED = 'COMPLETED',
   NO_RESULT = 'NO_RESULT'
}

type LikeState = {
   status: Status
   assetType: AppAssetType
   assets: AnySearchResultsAssetType[]
   saveAsset?: AnySearchResultsAssetType
   collections: CollectionType[]
}

export const initialLikeState: LikeState = {
   status: Status.LOADING,
   assetType: app.assets.images,
   assets: [],
   saveAsset: undefined,
   collections: []
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

const PageLikes = () => {
   const router = useRouter()
   const UIContext = useUIContext()
   const assetType = app.assets[router.query.assetType as keyof AppProvidersType] || initialLikeState.assetType

   const saveAssetModalRef = useRef<any>(null)
   const [likeState, setLikeState] = useState<LikeState>(initialLikeState)

   const handleLike = async ({ asset }: any) => {
      const likeService = new LikeService()

      await likeService
         .toggle({
            assetType: assetType.name,
            asset: asset
         })
         .then(async response => {
            switch (response.status) {
               case 200:
                  let likedAssets = await response.json()

                  likedAssets = likedAssets.map((likedAsset: any) => {
                     return JSON.parse(likedAsset.asset)
                  })

                  setLikeState(current => {
                     return {
                        ...current,
                        assets: likedAssets,
                        status: likedAssets.length ? likeState.status : Status.NO_RESULT
                     }
                  })
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

   const handleSave = async ({ asset }: any) => {
      setLikeState(current => {
         return {
            ...current,
            saveAsset: asset
         }
      })

      saveAssetModalRef.current?.setIsOpen(true)
   }

   const getLikedAssets = async () => {
      const likeService = new LikeService()

      await likeService
         .list(assetType.name)
         .then(async response => {
            let likedAssets = await response.json()

            likedAssets = likedAssets.map((likedAsset: any) => {
               return JSON.parse(likedAsset.asset)
            })

            setLikeState(current => {
               return {
                  ...current,
                  assets: likedAssets,
                  status: likedAssets.length ? Status.COMPLETED : Status.NO_RESULT
               }
            })
         })
         .catch(error => {
            errorHandler(new Error(error))
         })
   }

   const getCollections = async () => {
      const collectionService = new CollectionService()

      await collectionService
         .list(assetType.name)
         .then(async response => {
            const collections = await response.json()

            setLikeState(current => {
               return {
                  ...current,
                  collections: collections
               }
            })
         })
         .catch(error => {
            errorHandler(new Error(error))
         })
   }

   const setCollections = (collections: any) => {
      setLikeState(current => {
         return {
            ...current,
            collections: collections
         }
      })
   }

   useEffect(() => {
      void getLikedAssets()

      void getCollections()

      return () => {
         setLikeState(initialLikeState)
      }
   }, [assetType])

   return (
      <>
         <Meta title={trans('pages.likes.metaTitle')} />
         <div className="mx-auto mt-6 max-w-screen-lg max-lg:px-4 sm:mt-10">
            <h1 className="text-3xl font-semibold text-black md:text-4xl">{trans('pages.likes.metaTitle')}</h1>
         </div>
         <div className="mt-4 border-b border-gray-300/75 max-lg:px-4">
            <ul className="mx-auto flex max-w-screen-lg items-center gap-8 whitespace-nowrap max-lg:overflow-x-auto">
               {Object.entries(app.assets).map(([key, item]) => (
                  <li key={key}>
                     <Link
                        href={{
                           pathname: routes.page.account.likes,
                           query: { assetType: item.name }
                        }}
                        className={`block border-b-2 py-3.5 text-md hover:text-blue-600 ${
                           assetType.name === item.name
                              ? 'border-blue-600 text-blue-600'
                              : 'border-transparent text-gray-600'
                        }`}
                     >
                        {item.title}
                     </Link>
                  </li>
               ))}
            </ul>
         </div>
         <section className="mb-10 p-4 sm:mt-5">
            {Object.entries(ResultLayouts).map(([layoutName, ResultsComponent]) => {
               if (layoutName === assetType.name) {
                  if (likeState.status === Status.LOADING)
                     return (
                        <article key={assetType.name} className="mt-16 flex flex-col items-center">
                           <span className="spinner h-7 w-7 border border-gray-600"></span>
                        </article>
                     )

                  if (likeState.status === Status.NO_RESULT)
                     return (
                        <article key={assetType.name} className="mt-8 flex flex-col items-center gap-4">
                           <EmptySVG className="h-32 sm:h-64" />
                           <div className="text-center">
                              <h2 className="mb-1 text-xl font-semibold text-black">{trans('pages.likes.noResult')}</h2>
                              <p className="mb-6 text-md font-light text-gray-600">
                                 {trans('pages.likes.description')}
                              </p>
                              <Link
                                 href={{
                                    pathname: routes.page.search,
                                    query: { assetType: assetType.name }
                                 }}
                                 rel="nofollow"
                                 className="rounded-md bg-indigo-500 px-6 py-2 text-center text-sm text-white transition hover:bg-indigo-400"
                              >
                                 {trans('common.search')}
                              </Link>
                           </div>
                        </article>
                     )

                  return (
                     <Fragment key={layoutName}>
                        <ResultsComponent
                           foundAssets={likeState.assets}
                           likedAssets={likeState.assets}
                           handleLike={handleLike}
                           collections={likeState.collections}
                           handleSave={handleSave}
                        />
                     </Fragment>
                  )
               }
            })}

            <CollectionModal
               ref={saveAssetModalRef}
               assetType={assetType.name}
               saveAsset={likeState.saveAsset}
               collections={likeState.collections}
               setCollections={setCollections}
            />
         </section>
      </>
   )
}

PageLikes.ProtectedPage = true

export default PageLikes
