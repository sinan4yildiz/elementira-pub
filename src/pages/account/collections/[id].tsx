import { A, Meta } from '@components/common'
import { CollectionModal } from '@components/modals'
import { AppAssetsType } from '@constants/app/types'
import { routes } from '@constants/index'
import { useUIContext } from '@contexts/ui'
import IconArrowLeft from '@icons/arrow-left.svg'
import { AnySearchResultsAssetType } from '@lib/types'
import { errorHandler, isFilled, trans } from '@lib/utils'
import Error404 from '@pages/404'
import { CollectionType } from '@services/collectionService/types'
import { CollectionService, LikeService } from '@services/index'
import { LikedAssetType } from '@services/likeService/types'
import EmptySVG from '@svg/empty.svg'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useRef, useState } from 'react'

enum Status {
   LOADING = 'LOADING',
   COMPLETED = 'COMPLETED',
   NO_RESULT = 'NO_RESULT',
   NOT_FOUND = 'NOT_FOUND'
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

const PageCollection = () => {
   const router = useRouter()
   const UIContext = useUIContext()
   const saveAssetModalRef = useRef<any>(null)
   const [status, setStatus] = useState<Status>(Status.LOADING)
   const [collection, setCollection] = useState<CollectionType>()
   const [collections, setCollections] = useState<CollectionType[]>([])
   const [likedAssets, setLikedAssets] = useState<LikedAssetType[]>([])
   const [saveAsset, setSaveAsset] = useState<AnySearchResultsAssetType>()

   const getCollection = async () => {
      const collectionService = new CollectionService()

      await collectionService
         .getOne(router.query.id as string)
         .then(async response => {
            const collection = await response.json()

            collection.assets = collection.assets.map((asset: any) => {
               return JSON.parse(asset.asset)
            })

            setCollection(collection)

            if (response.ok) {
               setStatus(collection.assets.length ? Status.COMPLETED : Status.NO_RESULT)
            } else {
               setStatus(Status.NOT_FOUND)
            }
         })
         .catch(error => {
            errorHandler(new Error(error))
         })
   }

   const getCollections = async () => {
      const collectionService = new CollectionService()

      await collectionService
         .list(collection?.assetType as string)
         .then(async response => {
            setCollections(await response.json())
         })
         .catch(error => {
            errorHandler(new Error(error))
         })
   }

   const handleLike = async ({ asset }: any) => {
      const likeService = new LikeService()

      await likeService
         .toggle({
            assetType: collection?.assetType as string,
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

   const getLikedAssets = async () => {
      const likeService = new LikeService()

      await likeService
         .list(collection?.assetType as string)
         .then(async response => {
            setLikedAssets(await response.json())
         })
         .catch(error => {
            errorHandler(new Error(error))
         })
   }

   const handleSave = async ({ asset }: any) => {
      setSaveAsset(asset)

      saveAssetModalRef.current?.setIsOpen(true)
   }

   useEffect(() => {
      if (router.query.id) {
         void getCollection()
      }
   }, [router.query.id])

   useEffect(() => {
      if (isFilled(collection)) {
         void getCollections()
         void getLikedAssets()
      }
   }, [collection])

   if (status === Status.NOT_FOUND) return <Error404 />

   if (status === Status.LOADING)
      return (
         <div className="mt-48 flex flex-col items-center">
            <span className="spinner h-7 w-7 border border-gray-600"></span>
         </div>
      )

   return (
      <>
         <Meta
            title={
               collection
                  ? trans('pages.collections.detail.metaTitle', {
                       name: collection?.name
                    })
                  : ''
            }
         />
         <div className="mx-auto mt-6 max-w-screen-lg max-lg:px-4 sm:mt-10">
            <div className="mb-1 flex items-start justify-between gap-4">
               <h1 className="text-3xl font-semibold text-black md:text-4xl">{collection?.name}</h1>
               <A
                  href={{
                     pathname: routes.page.account.collections.list,
                     query: { assetType: collection?.assetType }
                  }}
                  color="light"
                  size="sm"
                  className="!px-4"
               >
                  <IconArrowLeft className="mr-2 h-3 w-3 fill-current" /> {trans('common.allCollections')}
               </A>
            </div>
            <p className="text-xs text-gray-500 sm:text-sm">
               {trans('common.xAssets', { count: collection?.assets.length }, collection?.assets.length)}
            </p>
         </div>
         <section className="mb-10 p-4 sm:mt-5">
            {status === Status.NO_RESULT && (
               <div className="mt-8 flex flex-col items-center gap-4">
                  <EmptySVG className="h-32 sm:h-64" />
                  <div className="text-center">
                     <h2 className="mb-1 text-xl font-semibold text-black">
                        {trans('pages.collections.detail.noResult')}
                     </h2>
                     <p className="mb-6 text-md font-light text-gray-600">
                        {trans('pages.collections.detail.description')}
                     </p>
                     <Link
                        href={{
                           pathname: routes.page.search,
                           query: { assetType: collection?.assetType }
                        }}
                        rel="nofollow"
                        className="rounded-md bg-indigo-500 px-6 py-2 text-center text-sm text-white transition hover:bg-indigo-400"
                     >
                        {trans('common.search')}
                     </Link>
                  </div>
               </div>
            )}

            {Object.entries(ResultLayouts).map(([layoutName, ResultsComponent]) => {
               if (layoutName === collection?.assetType) {
                  return (
                     <Fragment key={layoutName}>
                        <ResultsComponent
                           foundAssets={collection.assets}
                           likedAssets={likedAssets}
                           handleLike={handleLike}
                           collections={collections}
                           handleSave={handleSave}
                        />
                     </Fragment>
                  )
               }
            })}
         </section>

         <CollectionModal
            ref={saveAssetModalRef}
            assetType={collection?.assetType as never}
            saveAsset={saveAsset}
            collections={collections}
            setCollections={setCollections}
         />
      </>
   )
}

PageCollection.ProtectedPage = true

export default PageCollection
