import { Meta } from '@components/common'
import { routes } from '@constants/index'
import { trans } from '@lib/utils'
import NotFoundSVG from '@svg/not-found.svg'
import Link from 'next/link'
import React from 'react'

const Error404 = () => {
   return (
      <>
         <Meta title={trans('pages.404.metaTitle')} />
         <section className="mx-auto mt-7 max-w-full px-4 max-sm:text-center sm:w-8/12">
            <NotFoundSVG className="mb-4 w-[25rem] max-w-[70%] max-sm:mx-auto" />
            <h1 className="mb-2 text-2xl font-semibold text-black sm:text-3xl">{trans('pages.404.heading')}</h1>
            <p className="mb-8 font-light text-gray-600 max-sm:text-sm">{trans('pages.404.description')}</p>
            <Link
               href={routes.page.home}
               className="rounded-md bg-pink-500 px-6 py-2 text-center text-sm text-white transition hover:bg-pink-400"
            >
               {trans('common.goHome')}
            </Link>
         </section>
      </>
   )
}

export default Error404
