import { isFilled, trans } from '@lib/utils'
import Head from 'next/head'
import { ReactNode } from 'react'

type PropsType = {
   title?: string
   description?: string
   robots?: string
   page?: string
   children?: ReactNode
}

const Meta = ({ title, description, robots, page, children }: PropsType) => {
   let metaTitle = title

   if (isFilled(metaTitle)) {
      if (page !== 'home') metaTitle += ` - ${trans('common.appName')}`
   } else {
      metaTitle = trans('common.appName')
   }

   return (
      <Head>
         <title key="title">{metaTitle}</title>
         <meta key="description" name="description" content={description} />
         <meta key="robots" name="robots" content={robots ?? 'index,follow'} />
         <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
         <link key="favicon" rel="icon" type="image/png" href="/assets/images/favicon.png" />
         <link rel="apple-touch-icon" href="/assets/images/app-icon-default.png" />
         <link rel="apple-touch-icon" sizes="256x256" href="/assets/images/app-icon-256.png" />
         {children}
      </Head>
   )
}

export default Meta
