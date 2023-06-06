import { Button, Input } from '@components/ui'
import { routes, test } from '@constants/index'
import { useUIContext } from '@contexts/ui'
import { Dialog, Transition } from '@headlessui/react'
import IconCross from '@icons/cross.svg'
import { errorHandler, fetcher, testId, trans } from '@lib/utils'
import React, { FormEvent, forwardRef, Fragment, useImperativeHandle, useState } from 'react'

type PropsType = {
   email?: string
}

export type ResetPasswordFormFieldsType = {
   email: string
}

const ResetPasswordModal = forwardRef(({ email }: PropsType, ref) => {
   const UIContext = useUIContext()
   const [isOpen, setIsOpen] = useState(false)
   const [loading, setLoading] = useState<boolean>(false)
   const [formErrors, setFormErrors] = useState({} as ResetPasswordFormFieldsType)

   async function onFormSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault()

      setLoading(true)
      setFormErrors({} as ResetPasswordFormFieldsType)

      const form = e.currentTarget

      await fetcher({
         url: form.action,
         method: routes.api.account.resetPassword.method,
         data: Object.fromEntries(new FormData(form).entries())
      })
         .then(async response => {
            const data = await response.json()

            switch (response.status) {
               case 200:
                  form.reset()

                  setIsOpen(false)

                  UIContext.pushToast({
                     type: 'success',
                     text: trans('success.newPasswordSent')
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
               setLoading(false)
            }, 500)
         })

      setLoading(false)
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
                              {trans('pages.resetPassword.metaTitle')}
                           </h3>
                           <p className="mb-6 text-sm font-light text-gray-500">
                              {trans('pages.resetPassword.description')}
                           </p>
                           <form
                              onSubmit={onFormSubmit}
                              action={routes.api.account.resetPassword.path}
                              className="flex flex-col gap-4"
                              data-test-id={testId(test.elements.resetPasswordForm)}
                           >
                              <div>
                                 <Input
                                    type="email"
                                    floatingLabel={true}
                                    name="email"
                                    id="email"
                                    defaultValue={email}
                                    error={formErrors.email}
                                    placeholder=" "
                                    required={true}
                                 >
                                    {trans('common.emailAddress')}
                                 </Input>
                              </div>
                              <div className="flex items-center gap-2">
                                 <Button type="submit" color="blue" size="sm" disabled={loading}>
                                    {trans('common.submit')}
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

ResetPasswordModal.displayName = 'ResetPasswordModal'

export default ResetPasswordModal
