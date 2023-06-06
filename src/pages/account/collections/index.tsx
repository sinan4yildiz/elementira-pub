import { Meta } from '@components/common'
import { CollectionModal, CollectionUpdateModal } from '@components/modals'
import { Button } from '@components/ui'
import { AppAssetType, AppProvidersType } from '@constants/app/types'
import { app, routes } from '@constants/index'
import { Menu, Transition } from '@headlessui/react'
import IconEllipsisVertical from '@icons/ellipsis-vertical.svg'
import { errorHandler, isFilled, route, trans } from '@lib/utils'
import { initialLikeState } from '@pages/account/likes'
import { CollectionType } from '@services/collectionService/types'
import { CollectionService } from '@services/index'
import EmptySVG from '@svg/empty.svg'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'

enum Status {
   LOADING = 'LOADING',
   COMPLETED = 'COMPLETED',
   NO_RESULT = 'NO_RESULT'
}

type CollectionState = {
   status: Status
   assetType: AppAssetType
   collections: CollectionType[]
}

export const initialCollectionState: CollectionState = {
   status: Status.LOADING,
   assetType: app.assets.images,
   collections: []
}

const PageCollections = () => {
   const router = useRouter()
   const assetType = app.assets[router.query.assetType as keyof AppProvidersType] || initialLikeState.assetType

   const createModalRef = useRef<any>(null)
   const updateModalRef = useRef<any>(null)

   const [collectionState, setCollectionState] = useState<CollectionState>(initialCollectionState)

   const getCollections = async () => {
      const collectionService = new CollectionService()

      await collectionService
         .list(assetType.name)
         .then(async response => {
            let collections = await response.json()

            setCollectionState(current => {
               return {
                  ...current,
                  collections: collections,
                  status: collections.length ? Status.COMPLETED : Status.NO_RESULT
               }
            })
         })
         .catch(error => {
            errorHandler(new Error(error))
         })
   }

   const updateCollection = async (collection: CollectionType) => {
      updateModalRef.current?.setCollection(collection)

      updateModalRef.current?.setIsOpen(true)
   }

   const deleteCollection = async (collection: CollectionType) => {
      if (!confirm(trans('common.areYouSure'))) return

      const collectionService = new CollectionService()

      await collectionService
         .delete(collection)
         .then(async response => {
            let collections = await response.json()

            setCollectionState(current => {
               return {
                  ...current,
                  collections: collections,
                  status: collections.length ? Status.COMPLETED : Status.NO_RESULT
               }
            })
         })
         .catch(error => {
            errorHandler(new Error(error))
         })
   }

   const setCollections = (collections: any) => {
      setCollectionState(current => {
         return {
            ...current,
            collections: collections,
            status: Status.COMPLETED
         }
      })
   }

   useEffect(() => {
      void getCollections()

      return () => {
         setCollectionState(initialCollectionState)
      }
   }, [assetType])

   return (
      <>
         <Meta title={trans('pages.collections.list.metaTitle')} />
         <div className="mx-auto mt-6 flex max-w-screen-lg items-center justify-between gap-4 max-lg:px-4 sm:mt-10">
            <h1 className="text-3xl font-semibold text-black md:text-4xl">
               {trans('pages.collections.list.metaTitle')}
            </h1>
            <Button onClick={() => createModalRef.current?.setIsOpen(true)} color="blue" size="sm">
               <span className="xs:hidden">{trans('common.new')}</span>
               <span className="max-xs:hidden">{trans('common.newCollection')}</span>
            </Button>
         </div>
         <div className="mt-4 border-b border-gray-300/75 max-lg:px-4">
            <ul className="mx-auto flex max-w-screen-lg items-center gap-8 whitespace-nowrap max-lg:overflow-x-auto">
               {Object.entries(app.assets).map(([key, item]) => (
                  <li key={key}>
                     <Link
                        href={{
                           pathname: routes.page.account.collections.list,
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
         <section className="mx-auto my-6 max-w-screen-lg max-lg:px-4 sm:my-10">
            <CollectionModal ref={createModalRef} assetType={assetType.name} setCollections={setCollections} />
            <CollectionUpdateModal ref={updateModalRef} setCollections={setCollections} />

            {collectionState.status === Status.LOADING && (
               <div className="mt-16 flex flex-col items-center">
                  <span className="spinner h-7 w-7 border border-gray-600"></span>
               </div>
            )}

            {collectionState.status === Status.NO_RESULT && (
               <div className="mt-8 flex flex-col items-center gap-4">
                  <EmptySVG className="h-32 sm:h-64" />
                  <div className="text-center">
                     <h2 className="mb-1 text-xl font-semibold text-black">
                        {trans('pages.collections.list.noResult')}
                     </h2>
                     <p className="mb-6 text-md font-light text-gray-600">{trans('pages.collections.description')}</p>
                     {/*<Button onClick={() => createModalRef.current?.setIsOpen(true)} color="indigo" size="sm">
                        {trans('common.createNew')}
                     </Button>*/}
                  </div>
               </div>
            )}

            {isFilled(collectionState.collections) && (
               <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                  {collectionState.collections.map((collection, key) => (
                     <li
                        key={key}
                        className="relative flex items-center justify-between gap-4 rounded-lg bg-white px-6 py-8 text-md shadow-sm transition hover:text-blue-600"
                     >
                        <Link
                           href={route({
                              path: routes.page.account.collections.detail,
                              params: {
                                 id: collection._id
                              }
                           })}
                           className="absolute inset-0"
                        ></Link>
                        <div>
                           <h4 className="font-medium">{collection.name}</h4>
                           <span className="text-xs font-light text-gray-500">
                              {trans('common.xAssets', { count: collection.assets.length }, collection.assets.length)}
                           </span>
                        </div>
                        <div className="relative z-5 -mr-2">
                           <Menu>
                              <Menu.Button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100 hover:text-gray-800">
                                 <IconEllipsisVertical className="h-4 w-4 fill-current" />
                              </Menu.Button>
                              <Transition
                                 enter="transition ease-out duration-100"
                                 enterFrom="transform opacity-0 scale-95"
                                 enterTo="transform opacity-100 scale-100"
                                 leave="transition ease-in duration-75"
                                 leaveFrom="transform opacity-100 scale-100"
                                 leaveTo="transform opacity-0 scale-95"
                              >
                                 <Menu.Items className="absolute right-0 w-40 origin-top-right rounded-lg bg-white p-3 shadow-lg ring-1 ring-gray-100">
                                    <Menu.Item>
                                       <button
                                          type="button"
                                          onClick={() => updateCollection(collection)}
                                          className="block w-full cursor-pointer whitespace-nowrap rounded-md px-2 py-1.5 text-left text-sm text-gray-500 transition hover:bg-gray-100 hover:text-blue-600 sm:rounded-lg sm:px-3.5 sm:py-2"
                                       >
                                          {trans('common.edit')}
                                       </button>
                                    </Menu.Item>
                                    <Menu.Item>
                                       <button
                                          type="button"
                                          onClick={() => deleteCollection(collection)}
                                          className="block w-full cursor-pointer whitespace-nowrap rounded-md px-2 py-1.5 text-left text-sm text-red-600 transition hover:bg-red-50 sm:rounded-lg sm:px-3.5 sm:py-2"
                                       >
                                          {trans('common.delete')}
                                       </button>
                                    </Menu.Item>
                                 </Menu.Items>
                              </Transition>
                           </Menu>
                        </div>
                     </li>
                  ))}
               </ul>
            )}
         </section>
      </>
   )
}

PageCollections.ProtectedPage = true

export default PageCollections
