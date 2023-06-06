import { Footer, Header, Toasts } from '@components/template'
import { Button } from '@components/ui'
import { routes } from '@constants/index'
import { useUIContext } from '@contexts/ui'
import usePrevious from '@hooks/usePrevious'
import IconArrowUp from '@icons/arrow-up.svg'
import IconCookieBite from '@icons/cookie-bite-duo.svg'
import { trans } from '@lib/utils'
import Cookies from 'js-cookie'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useRef, useState } from 'react'

type PropsType = {
   children: ReactElement
}

const StandardLayout = ({ children }: PropsType) => {
   const router = useRouter()
   const UIContext = useUIContext()
   const { status: session } = useSession()
   const prevSession = usePrevious(session)
   const scrollTopRef = useRef<HTMLButtonElement>(null)
   const [cookieConsent, setCookieConsent] = useState(false)

   const handleCookieConsent = () => {
      Cookies.set('cookieConsent', 'true', {
         expires: 30
      })

      setCookieConsent(false)
   }

   const handleScrollTop = () => {
      window.scrollTo(0, 0)
   }

   useEffect(() => {
      if (!Cookies.get('cookieConsent')) {
         setCookieConsent(true)
      }

      const scrollTopEvent = () => {
         const button = scrollTopRef.current as HTMLButtonElement

         if (window.scrollY > 1000) {
            button?.classList.remove('hidden')
         } else {
            button?.classList.add('hidden')
         }
      }

      window.addEventListener('scroll', scrollTopEvent)

      return () => {
         document.body.style.removeProperty('padding-top')

         window.removeEventListener('scroll', scrollTopEvent)
      }
   }, [])

   useEffect(() => {
      UIContext.closeMobileNav()
   }, [router.asPath])

   useEffect(() => {
      if (prevSession === 'authenticated' && session === 'unauthenticated') {
         UIContext.pushToast({
            type: 'success',
            text: trans('success.signedOut')
         })
      }
   }, [session])

   useEffect(() => {
      if (UIContext.mobileNavState) {
         document.body.classList.add('overflow-hidden')
      } else {
         document.body.classList.remove('overflow-hidden')
      }
   }, [UIContext.mobileNavState])

   return (
      <>
         <Header />
         <main className="relative min-h-[40rem]">
            <Toasts />
            {children}
            <button
               type="button"
               ref={scrollTopRef}
               onClick={handleScrollTop}
               className="group fixed bottom-4 right-4 z-8 flex hidden h-9 w-9 items-center justify-center rounded-xl bg-white text-black opacity-75 shadow-xl transition hover:opacity-100"
            >
               <IconArrowUp className="h-3 w-3 fill-current transition group-active:-translate-y-0.5" />
            </button>
         </main>
         {cookieConsent && (
            <div className="fixed bottom-8 z-10 rounded-lg bg-white px-6 py-5 drop-shadow-xl max-sm:inset-x-8 sm:left-1/2 sm:max-w-screen-sm sm:-translate-x-1/2">
               <h4 className="flex items-center gap-3 text-md text-gray-700">
                  <IconCookieBite className="w-6 fill-blue-600" />
                  {trans('pages.cookies.popupTitle')}
               </h4>
               <p className="my-3 text-sm font-light text-gray-700">
                  {trans('messages.cookieConsent')}
                  <Link href={routes.page.cookies} className="ml-2 underline">
                     {trans('pages.cookies.seeCookiePolicy')}
                  </Link>
               </p>
               <Button onClick={handleCookieConsent} color="blueLight" size="sm">
                  {trans('common.accept')}
               </Button>
            </div>
         )}
         <Footer />
      </>
   )
}

export default StandardLayout
