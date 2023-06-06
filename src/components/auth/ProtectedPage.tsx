import { routes } from '@constants/index'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'

type PropsType = {
   children: ReactNode
}

const ProtectedPage = ({ children }: PropsType) => {
   const router = useRouter()
   const { status: session } = useSession()

   /*if (session === 'loading') {
      return (
         <section className="flex items-center justify-center mt-16 md:mt-24">
            <span className="spinner w-6 h-6 border-2 border-blue-500"></span>
         </section>
      )
   }*/

   if (session === 'unauthenticated') {
      ;(() => void router.push(routes.page.account.signIn))()

      return <></>
   }

   return <>{children}</>
}

export default ProtectedPage
