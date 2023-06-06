import { Meta } from '@components/common'
import { Button, Input } from '@components/ui'
import { routes } from '@constants/index'
import { useUIContext } from '@contexts/ui'
import { errorHandler, fetcher, trans } from '@lib/utils'
import { signIn, useSession } from 'next-auth/react'
import React, { FormEvent, useState } from 'react'

export type UpdateProfileFormFieldsType = {
   fullName: string
   email: string
   password: string
}

const PageProfile = () => {
   const UIContext = useUIContext()
   const { data: session } = useSession()
   const [loading, setLoading] = useState(false)
   const [passwordVisibility, setPasswordVisibility] = useState(false)
   const [formErrors, setFormErrors] = useState({} as UpdateProfileFormFieldsType)

   async function onFormSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault()

      setLoading(true)
      setFormErrors({} as UpdateProfileFormFieldsType)

      const form = e.currentTarget
      const formData = new FormData(form)

      await fetcher({
         url: form.action,
         method: routes.api.account.profile.update.method,
         data: Object.fromEntries(formData.entries())
      })
         .then(async response => {
            const data = await response.json()

            switch (response.status) {
               case 200:
                  await signIn('updateSession', { redirect: false })

                  UIContext.pushToast({
                     type: 'success',
                     text: trans('success.profileUpdated')
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
   }

   return (
      <>
         <Meta
            title={trans('pages.profile.metaTitle', {
               name: session?.user?.name
            })}
         />
         <section className="mx-auto my-10 w-[32rem] max-w-[90%]">
            <div className="mb-2 text-4xl">👋🏼</div>
            <h1 className="mb-1 text-3xl font-semibold text-black md:text-4xl">{session?.user?.name}</h1>
            <p className="mb-6 text-sm text-gray-500">{session?.user?.email}</p>
            <article className="relative mb-6 rounded-xl bg-white px-4 py-6 shadow-sm md:px-8 md:py-8">
               <h2 className="-mt-2 mb-4 text-lg font-medium text-black">{trans('pages.profile.editProfile')}</h2>
               <hr className="-mx-6 mb-10 border-gray-200/75 md:-mx-8" />
               <form
                  onSubmit={onFormSubmit}
                  action={routes.api.account.profile.update.path}
                  method="post"
                  autoComplete="off"
                  className="flex flex-col gap-6"
               >
                  <div>
                     <Input
                        floatingLabel={true}
                        name="fullName"
                        id="inputFullName"
                        defaultValue={session?.user?.name}
                        error={formErrors.fullName}
                        placeholder=" "
                        minLength={6}
                        required={true}
                     >
                        {trans('common.fullName')}
                     </Input>
                  </div>
                  <div>
                     <Input
                        type="email"
                        floatingLabel={true}
                        name="email"
                        id="inputEmail"
                        defaultValue={session?.user?.email}
                        error={formErrors.email}
                        placeholder=" "
                        required={true}
                     >
                        {trans('common.emailAddress')}
                     </Input>
                  </div>
                  {passwordVisibility && (
                     <div>
                        <Input
                           type="password"
                           floatingLabel={true}
                           name="password"
                           id="inputPassword"
                           error={formErrors.password}
                           autoComplete="new-password"
                           autoFocus={true}
                           placeholder=" "
                        >
                           {trans('common.newPassword')}
                        </Input>
                     </div>
                  )}
                  <div className="flex items-center justify-between">
                     <Button type="submit" color="blue" size="sm" disabled={loading}>
                        {trans('common.update')}
                     </Button>
                     <Button onClick={() => setPasswordVisibility(!passwordVisibility)} size="sm" className="!px-4">
                        {trans('pages.profile.changePassword')}
                     </Button>
                  </div>
               </form>
            </article>
         </section>
      </>
   )
}

PageProfile.ProtectedPage = true

export default PageProfile
