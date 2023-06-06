import { GuestPage, ProtectedPage } from '@components/auth'
import { StandardLayout } from '@components/layouts'
import { env } from '@constants/index'
import { AppProvider } from '@contexts/app/provider'
import { UIProvider } from '@contexts/ui/provider'
import { Poppins } from '@next/font/google'
import '@styles/global.scss'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import React from 'react'

type AppType = AppProps & {
   Component: any
}

const font = Poppins({
   weight: ['300', '400', '500', '600'],
   subsets: ['latin']
})

const app = ({ Component, pageProps: { session, ...pageProps } }: AppType) => {
   let Body = <Component {...pageProps} />

   const Layout = Component.Layout || StandardLayout

   if (Component.ProtectedPage) {
      Body = <ProtectedPage>{Body}</ProtectedPage>
   }

   if (Component.GuestPage) {
      Body = <GuestPage>{Body}</GuestPage>
   }

   return (
      <SessionProvider session={session}>
         <AppProvider>
            <UIProvider>
               <Layout pageProps={pageProps}>{Body}</Layout>
            </UIProvider>
         </AppProvider>
         <style jsx global>
            {`
               :root {
                  --default-font: ${font.style.fontFamily};
               }
            `}
         </style>
         {env.private.APP_ENV === 'production' && (
            <>
               <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-5D1FR86120" />
               <Script strategy="afterInteractive" id="ga">
                  {`
                     window.dataLayer = window.dataLayer || [];
                     function gtag(){dataLayer.push(arguments);}
                     gtag('js', new Date());
      
                     gtag('config', 'G-5D1FR86120');
                  `}
               </Script>
            </>
         )}
      </SessionProvider>
   )
}

export default app
