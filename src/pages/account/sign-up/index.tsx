import { AuthProviders } from '@components/auth'
import { Meta } from '@components/common'
import { Button, Input } from '@components/ui'
import { routes, test } from '@constants/index'
import { useUIContext } from '@contexts/ui'
import { errorHandler, fetcher, testId, trans } from '@lib/utils'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'

export type SignUpFormFieldsType = {
   fullName: string
   email: string
   password: string
}

const PageSignUp = () => {
   const UIContext = useUIContext()
   const [loading, setLoading] = useState(false)
   const [formErrors, setFormErrors] = useState({} as SignUpFormFieldsType)

   async function onSignUpSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault()

      setLoading(true)
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
                  UIContext.pushToast({
                     type: 'success',
                     text: trans('success.signedUp')
                  })

                  const performSignIn = await signIn('credentials', {
                     email: formData.get('email'),
                     password: formData.get('password'),
                     redirect: false
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
         <Meta title={trans('pages.signUp.metaTitle')} />
         <section className="mx-auto my-10 w-[34rem] max-w-full px-4 md:my-16">
            <h1 className="mb-4 px-4 text-3xl font-semibold text-black md:px-10 md:text-4xl">
               {trans('common.signUp')}
            </h1>
            <div className="rounded-xl bg-white px-4 py-6 shadow-sm md:px-10 md:py-10">
               <article className="mb-6 flex flex-col gap-1.5 text-sm text-gray-400">
                  <p>{trans('pages.signUp.introduction')}</p>
                  <p>{trans('pages.signUp.signInInstruction')}</p>
                  <p>
                     <Link href={routes.page.account.signIn} className="font-medium text-blue-600 hover:underline">
                        {trans('common.signInHere')}
                     </Link>
                  </p>
               </article>
               <article>
                  <form
                     onSubmit={onSignUpSubmit}
                     action={routes.api.account.signUp.path}
                     method="post"
                     autoComplete="on"
                     className="flex flex-col gap-4"
                     data-test-id={testId(test.elements.signUpForm)}
                  >
                     <div>
                        <Input
                           floatingLabel={true}
                           name="fullName"
                           id="inputFullName"
                           autoComplete="name"
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
                           error={formErrors.email}
                           placeholder=" "
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
                           error={formErrors.password}
                           placeholder=" "
                           minLength={6}
                           required={true}
                        >
                           {trans('common.password')}
                        </Input>
                     </div>
                     <div>
                        <Button type="submit" color="blue" className="w-full" disabled={loading}>
                           {trans('common.signUp')}
                        </Button>
                     </div>
                     <p
                        className="px-4 text-center text-xs leading-5 text-zinc-400 [&>a]:text-blue-500"
                        dangerouslySetInnerHTML={{
                           __html: trans('pages.signUp.agreements', {
                              termsOfUse: `<a href="${routes.page.termsOfUse}">${trans(
                                 'pages.termsOfUse.metaTitle'
                              )}</a>`,
                              privacyPolicy: `<a href="${routes.page.privacyPolicy}">${trans(
                                 'pages.privacyPolicy.metaTitle'
                              )}</a>`
                           })
                        }}
                     ></p>
                  </form>
                  <div className="my-3 flex w-full items-center justify-center">
                     <hr className="my-8 h-px w-full border-0 bg-gray-200" />
                     <h2 className="absolute left-1/2 -translate-x-1/2 bg-white px-3 text-sm text-gray-400">
                        {trans('common.useOtherPlatforms')}
                     </h2>
                  </div>
                  <AuthProviders />
               </article>
            </div>
         </section>
      </>
   )
}

PageSignUp.GuestPage = true

export default PageSignUp
