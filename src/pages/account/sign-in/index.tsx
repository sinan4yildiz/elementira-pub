import { AuthProviders } from '@components/auth'
import { Meta } from '@components/common'
import { ResetPasswordModal } from '@components/modals'
import { Alert, Button, Input } from '@components/ui'
import { routes, test } from '@constants/index'
import { useUIContext } from '@contexts/ui'
import { errorHandler, fetcher, testId, trans } from '@lib/utils'
import { SignUpFormFieldsType } from '@pages/account/sign-up'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FormEvent, useRef, useState } from 'react'

const PageSignIn = () => {
   const router = useRouter()
   const UIContext = useUIContext()
   const authError = useRef<string | null>(null)
   const resetPasswordModalRef = useRef<any>(null)
   const [email, setEmail] = useState<string>(router.query.email as string)
   const [loading, setLoading] = useState<boolean>(false)
   const [formErrors, setFormErrors] = useState({} as SignUpFormFieldsType)

   if (router.query.error) {
      switch (router.query.error) {
         case 'alreadyExists':
            authError.current = trans('errors.socialAuth.alreadyExists')
            break

         default:
            authError.current = trans('errors.socialAuth.missingDetails')
            break
      }
   }

   async function onSignInSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault()

      setLoading(true)
      authError.current = null
      setFormErrors({} as SignUpFormFieldsType)

      const form = e.currentTarget
      const formData = new FormData(form)

      await fetcher({
         url: form.action,
         method: form.method,
         data: Object.fromEntries(formData.entries())
      })
         .then(async response => {
            const data = await response.json()

            switch (response.status) {
               case 200:
                  const performSignIn = await signIn('credentials', {
                     email: formData.get('email'),
                     password: formData.get('password'),
                     redirect: false
                  })

                  if (performSignIn?.ok) {
                     UIContext.pushToast({
                        type: 'success',
                        text: trans('success.signedIn')
                     })
                  }
                  break

               case 401:
                  authError.current = data.error
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
         <Meta title={trans('pages.signIn.metaTitle')} />
         <section className="mx-auto my-10 w-[34rem] max-w-full px-4 md:my-16">
            <h1 className="mb-4 px-4 text-3xl font-semibold text-black md:px-10 md:text-4xl">
               {trans('common.signIn')}
            </h1>
            <div className="rounded-xl bg-white px-4 py-6 shadow-sm md:px-10 md:py-10">
               <article className="mb-6 flex flex-col gap-1.5 text-sm text-gray-400">
                  <p>{trans('pages.signIn.introduction')}</p>
                  <p>{trans('pages.signIn.signUpInstruction')}</p>
                  <p>
                     <Link href={routes.page.account.signUp} className="font-medium text-blue-600 hover:underline">
                        {trans('common.createAccountNow')}
                     </Link>
                  </p>
               </article>
               {authError.current && (
                  <Alert type="error" className="-mt-2 mb-6">
                     {authError.current}
                  </Alert>
               )}
               <article>
                  <form
                     action={routes.api.account.signIn.path}
                     onSubmit={onSignInSubmit}
                     method="post"
                     className="flex flex-col gap-4"
                     data-test-id={testId(test.elements.signInForm)}
                  >
                     <div>
                        <Input
                           type="email"
                           floatingLabel={true}
                           defaultValue={email}
                           onChange={setEmail}
                           name="email"
                           id="inputEmail"
                           placeholder=" "
                           error={formErrors.email}
                           required={true}
                        >
                           {trans('common.emailAddress')}
                        </Input>
                     </div>
                     <div>
                        <Input
                           type="password"
                           floatingLabel={true}
                           name="password"
                           id="inputPassword"
                           placeholder=" "
                           error={formErrors.password}
                           minLength={6}
                           required={true}
                        >
                           {trans('common.password')}
                        </Input>
                     </div>
                     <div className="flex items-center justify-between">
                        <Button disabled={loading} type="submit" color="blue">
                           {trans('common.signIn')}
                        </Button>
                        <Button
                           onClick={() => resetPasswordModalRef?.current.setIsOpen(true)}
                           className="!px-4"
                           data-test-id={testId(test.elements.resetPasswordButton)}
                        >
                           {trans('common.forgotPassword')}
                        </Button>
                     </div>
                  </form>
                  <div className="my-10 flex w-full items-center justify-center">
                     <hr className="h-px w-full border-0 bg-gray-200" />
                     <h2 className="absolute left-1/2 -translate-x-1/2 bg-white px-3 text-sm text-gray-400">
                        {trans('common.useOtherPlatforms')}
                     </h2>
                  </div>
                  <AuthProviders />
               </article>
            </div>
            <ResetPasswordModal ref={resetPasswordModalRef} email={email} />
         </section>
      </>
   )
}

PageSignIn.GuestPage = true

export default PageSignIn
