import { Button, Input } from '@components/ui'
import { AppProvidersType } from '@constants/app/types'
import { routes } from '@constants/index'
import { useUIContext } from '@contexts/ui'
import { Dialog, Transition } from '@headlessui/react'
import IconCheck from '@icons/check.svg'
import IconCross from '@icons/cross.svg'
import { AnySearchResultsAssetType } from '@lib/types'
import { errorHandler, fetcher, isFilled, trans } from '@lib/utils'
import { CollectionSchemaInterface } from '@models/collectionModel'
import { CollectionCreateFormFieldsType, CollectionType } from '@services/collectionService/types'
import { CollectionService } from '@services/index'
import { HydratedDocument } from 'mongoose'
import { useSession } from 'next-auth/react'
import React, {
   Dispatch,
   FormEvent,
   forwardRef,
   Fragment,
   SetStateAction,
   useImperativeHandle,
   useRef,
   useState
} from 'react'

type PropsType = {
   assetType: keyof AppProvidersType
   saveAsset?: AnySearchResultsAssetType
   collections?: CollectionType[]
   setCollections?: Dispatch<SetStateAction<CollectionType[]>>
}

const CollectionModal = forwardRef(({ assetType, saveAsset, collections, setCollections }: PropsType, ref) => {
   const UIContext = useUIContext()
   const { status: session } = useSession()
   const [isOpen, setIsOpen] = useState(false)
   const collectionsListRef = useRef<HTMLDivElement>(null)
   const [saveLoading, setSaveLoading] = useState<any>(null)
   const [formLoading, setFormLoading] = useState<boolean>(false)
   const [formErrors, setFormErrors] = useState({} as CollectionCreateFormFieldsType)

   async function onCollectionFormSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault()

      setFormLoading(true)
      setFormErrors({} as CollectionCreateFormFieldsType)

      const form = e.currentTarget

      await fetcher({
         url: form.action,
         method: form.method,
         data: Object.fromEntries(new FormData(form).entries())
      })
         .then(async response => {
            const data = await response.json()

            switch (response.status) {
               case 200:
                  form.reset()

                  if (setCollections) {
                     setCollections(data.list)
                  }

                  if (collectionsListRef.current) {
                     collectionsListRef.current.scrollTop = 0
                  }

                  if (saveAsset) {
                     await handleSave(data.created)
                  } else {
                     setIsOpen(false)

                     UIContext.pushToast({
                        type: 'success',
                        text: trans('success.collectionCreated')
                     })
                  }
                  break

               case 401:
                  UIContext.pushToast({
                     type: 'warning',
                     text: trans('errors.unauthorized')
                  })
                  break

               case 422:
                  setFormErrors(data)
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
         .finally(() => {
            setTimeout(() => {
               setFormLoading(false)
            }, 500)
         })

      setFormLoading(false)
   }

   const handleSave = async (collection: HydratedDocument<CollectionSchemaInterface>) => {
      if (session !== 'authenticated' || !saveAsset) return

      setSaveLoading(collection._id)

      const collectionService = new CollectionService()

      await collectionService
         .toggle({
            collection: collection,
            asset: saveAsset
         })
         .then(async response => {
            const collections = await response.json()

            if (setCollections) setCollections(collections)
         })
         .catch(error => {
            errorHandler(new Error(error))
         })

      setSaveLoading(null)
   }

   const isSaved = (collection: CollectionType) => {
      if (!collections?.length) return false

      return collection.assets.find(asset => {
         return asset.assetUrl === saveAsset?.assetUrl
      })
   }

   useImperativeHandle(
      ref,
      () => {
         return {
            setIsOpen
         }
      },
      []
   )

   return (
      <Transition show={isOpen} as={Fragment}>
         <Dialog as="div" className="relative z-20" onClose={() => setIsOpen(false)}>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            <div className="fixed inset-0 min-h-screen overflow-y-auto">
               <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                     as={Fragment}
                     enter="ease-out duration-150"
                     enterFrom="opacity-0 scale-95 translate-y-0"
                     enterTo="opacity-100 scale-100 -translate-y-4"
                     leave="ease-in duration-150"
                     leaveFrom="opacity-100 scale-100"
                     leaveTo="opacity-0 scale-95"
                  >
                     <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-xl bg-white p-8 text-left align-middle shadow-xl transition-all sm:p-10">
                        <Button onClick={() => setIsOpen(false)} size="sm" className="absolute right-4 top-4 !px-2.5">
                           <IconCross className="h-4.5 w-4.5 fill-current" />
                        </Button>
                        {isFilled(saveAsset) && (
                           <article className="mb-8">
                              <h3 className="mb-1 text-lg font-medium leading-6 text-gray-900">
                                 {trans('pages.collections.yourCollections')}
                              </h3>
                              <p className="mb-4 text-sm text-gray-500">{trans('pages.collections.saveDescription')}</p>
                              {isFilled(collections) && (
                                 <div
                                    ref={collectionsListRef}
                                    className="scrollbar -mx-1 max-h-[20rem] overflow-y-auto"
                                 >
                                    <ul className="flex flex-col gap-2.5 p-1">
                                       {collections?.map((collection, key) => (
                                          <li key={key} onClick={() => handleSave(collection)}>
                                             <div
                                                className={`flex cursor-pointer select-none items-center justify-between rounded-lg px-5 py-4 text-md transition ${
                                                   isSaved(collection)
                                                      ? 'bg-blue-50 text-blue-600 ring-1'
                                                      : 'bg-gray-100 hover:text-blue-600'
                                                }`}
                                             >
                                                <div>
                                                   <h4>{collection.name}</h4>
                                                   <span className="text-xs font-light text-gray-500">
                                                      {trans(
                                                         'common.xAssets',
                                                         {
                                                            count: collection.assets.length
                                                         },
                                                         collection.assets.length
                                                      )}
                                                   </span>
                                                </div>
                                                {saveLoading === collection._id ? (
                                                   <span className="spinner h-3 w-3 border border-current"></span>
                                                ) : isSaved(collection) ? (
                                                   <IconCheck className="h-3 w-3 fill-current" />
                                                ) : (
                                                   ''
                                                )}
                                             </div>
                                          </li>
                                       ))}
                                    </ul>
                                 </div>
                              )}
                              {!isFilled(collections) && (
                                 <div className="flex justify-center rounded-lg bg-gray-100 py-8 text-int font-light text-gray-500">
                                    {trans('pages.collections.list.noResult')}
                                 </div>
                              )}
                           </article>
                        )}
                        <article>
                           <h3 className="mb-1 text-lg font-medium leading-6 text-gray-900">
                              {trans('pages.collections.createNew')}
                           </h3>
                           <p className="mb-6 text-sm text-gray-500">
                              {saveAsset
                                 ? trans('pages.collections.createDescription')
                                 : trans('pages.collections.description')}
                           </p>
                           <form
                              onSubmit={onCollectionFormSubmit}
                              action={routes.api.account.collections.create.path}
                              method={routes.api.account.collections.create.method}
                              className="flex flex-col gap-4"
                           >
                              <input type="hidden" name="assetType" value={assetType} />
                              <div>
                                 <Input
                                    floatingLabel={true}
                                    name="name"
                                    id="name"
                                    error={formErrors.name}
                                    placeholder=" "
                                    required={true}
                                 >
                                    {trans('common.name')}
                                 </Input>
                              </div>
                              <div className="flex items-center gap-2">
                                 <Button type="submit" color="blue" size="sm" disabled={formLoading}>
                                    {trans('common.create')}
                                 </Button>
                                 <Button onClick={() => setIsOpen(false)} size="sm">
                                    {trans('common.done')}
                                 </Button>
                              </div>
                           </form>
                        </article>
                     </Dialog.Panel>
                  </Transition.Child>
               </div>
            </div>
         </Dialog>
      </Transition>
   )
})

CollectionModal.displayName = 'CollectionModal'

export default CollectionModal
