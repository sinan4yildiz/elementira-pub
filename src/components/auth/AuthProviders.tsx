import { Button } from '@components/ui'
import { useAppContext } from '@contexts/app'
import FacebookIcon from '@icons/facebook.svg'
import GoogleIcon from '@icons/google-original.svg'
import { trans } from '@lib/utils'
import { BuiltInProviderType } from 'next-auth/providers'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'

const AuthProviders = () => {
   const AppContext = useAppContext()
   const [loading, setLoading] = useState<null | BuiltInProviderType>(null)

   async function signInWithProvider(provider: BuiltInProviderType) {
      await signIn(provider, { callbackUrl: AppContext.redirectAfterAuthState })

      setLoading(provider)
   }

   return (
      <ul className="relative flex flex-col gap-4">
         <li>
            <Button
               onClick={() => signInWithProvider('google')}
               color="redLight"
               size="lg"
               className="!w-full"
               disabled={loading === 'google'}
            >
               <GoogleIcon className="absolute left-4 h-4 fill-white" />{' '}
               {trans('pages.signIn.withSocial', { provider: 'Google' })}
               {loading === 'google' && (
                  <span className="spinner absolute right-4 h-3.5 w-3.5 border border-red-500"></span>
               )}
            </Button>
         </li>
         {/*<li>
            <button onClick={() => signInWithProvider('apple')} type="button" disabled={loading === 'apple'}
                    className="flex items-center justify-center gap-4 w-full font-medium transition px-5 py-3 text-sm text-center text-white bg-black rounded-full hover:opacity-80 disabled:cursor-progress">
               <AppleIcon className="h-5 fill-white absolute left-4" /> {trans('pages.signIn.withSocial', { provider: 'Apple' })}
               {loading === 'apple' && <span className="spinner w-4 h-4 border-2 absolute right-4"></span>}
            </button>
         </li>*/}
         <li>
            <Button
               onClick={() => signInWithProvider('facebook')}
               color="blueLight"
               size="lg"
               className="!w-full"
               disabled={loading === 'facebook'}
            >
               <FacebookIcon className="absolute left-4 h-5 fill-blue-600" />{' '}
               {trans('pages.signIn.withSocial', { provider: 'Facebook' })}
               {loading === 'facebook' && (
                  <span className="spinner absolute right-4 h-3.5 w-3.5 border border-blue-600"></span>
               )}
            </Button>
         </li>
         {/*<li>
            <button onClick={() => signInWithProvider('twitter')} type="button" disabled={loading === 'twitter'}
                    className="flex items-center justify-center gap-4 w-full font-medium transition px-5 py-3 text-sm text-center text-white bg-sky-400 rounded-full hover:opacity-80 disabled:cursor-progress">
               <TwitterIcon className="h-5 fill-white absolute left-4" /> {trans('pages.signIn.withSocial', { provider: 'Twitter' })}
               {loading === 'twitter' && <span className="spinner w-4 h-4 border-2 absolute right-4"></span>}
            </button>
         </li>*/}
      </ul>
   )
}

export default AuthProviders
