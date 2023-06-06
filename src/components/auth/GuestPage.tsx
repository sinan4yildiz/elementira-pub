import { routes } from '@constants/index'
import { useAppContext } from '@contexts/app'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'

type PropsType = {
   children: ReactNode
}

const GuestPage = ({ children }: PropsType) => {
   const router = useRouter()
   const AppContext = useAppContext()
   const { status: session } = useSession()

   /*if (session === 'loading') {
      return (
         <section className="flex items-center justify-center mt-16 md:mt-24">
            <span className="spinner w-6 h-6 border-2 border-blue-500"></span>
         </section>
      )
   }*/

   if (session === 'authenticated') {
      ;(() => {
         let redirect = routes.page.home

         if (AppContext.redirectAfterAuthState && AppContext.redirectAfterAuthState != router.asPath) {
            redirect = AppContext.redirectAfterAuthState
         }

         void router.push(redirect)
      })()

      return <></>
   }

   return <>{children}</>
}

export default GuestPage
