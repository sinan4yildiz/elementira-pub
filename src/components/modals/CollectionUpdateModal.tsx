import { Button, Input } from '@components/ui'
import { routes } from '@constants/index'
import { useUIContext } from '@contexts/ui'
import { Dialog, Transition } from '@headlessui/react'
import IconCross from '@icons/cross.svg'
import { errorHandler, fetcher, trans } from '@lib/utils'
import { CollectionType, CollectionUpdateFormFieldsType } from '@services/collectionService/types'
import React, { Dispatch, FormEvent, forwardRef, Fragment, SetStateAction, useImperativeHandle, useState } from 'react'

type PropsType = {
   setCollections: Dispatch<SetStateAction<CollectionType[]>>
}

const CollectionUpdateModal = forwardRef(({ setCollections }: PropsType, ref) => {
   const UIContext = useUIContext()
   const [isOpen, setIsOpen] = useState(false)
   const [formLoading, setFormLoading] = useState<boolean>(false)
   const [collection, setCollection] = useState<CollectionType>()
   const [formErrors, setFormErrors] = useState({} as CollectionUpdateFormFieldsType)

   async function onCollectionFormSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault()

      setFormLoading(true)
      setFormErrors({} as CollectionUpdateFormFieldsType)

      const form = e.currentTarget

      await fetcher({
         url: form.action,
         method: routes.api.account.collections.update.method,
         data: Object.fromEntries(new FormData(form).entries())
      })
         .then(async response => {
            const data = await response.json()

            switch (response.status) {
               case 200:
                  form.reset()

                  setCollections(data)
                  setIsOpen(false)

                  UIContext.pushToast({
                     type: 'success',
                     text: trans('success.collectionCreated')
                  })
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

   useImperativeHandle(
      ref,
      () => {
         return {
            setCollection,
            setIsOpen
         }
      },
      []
   )

   return (
      <Transition show={isOpen} as={Fragment}>
         <Dialog as="div" className="relative z-20" onClose={() => setIsOpen(false)}>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            <div className="fixed inset-0 overflow-y-auto">
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
                        <article>
                           <h3 className="mb-1 text-lg font-medium leading-6 text-gray-900">
                              {trans('pages.collections.createNew')}
                           </h3>
                           <p className="mb-6 text-sm text-gray-500">{trans('pages.collections.description')}</p>
                           <form
                              onSubmit={onCollectionFormSubmit}
                              action={routes.api.account.collections.update.path}
                              className="flex flex-col gap-4"
                           >
                              <input type="hidden" name="id" defaultValue={collection?._id as never} />
                              <div>
                                 <Input
                                    floatingLabel={true}
                                    name="name"
                                    id="name"
                                    defaultValue={collection?.name}
                                    error={formErrors.name}
                                    placeholder=" "
                                    required={true}
                                 >
                                    {trans('common.name')}
                                 </Input>
                              </div>
                              <div className="flex items-center gap-2">
                                 <Button type="submit" color="blue" size="sm" disabled={formLoading}>
                                    {trans('common.update')}
                                 </Button>
                                 <Button onClick={() => setIsOpen(false)} size="sm">
                                    {trans('common.cancel')}
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

CollectionUpdateModal.displayName = 'CollectionUpdateModal'

export default CollectionUpdateModal
