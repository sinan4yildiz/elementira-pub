import { Meta } from '@components/common'
import { Hero } from '@components/template'
import { app, routes } from '@constants/index'
import { sortObject, trans } from '@lib/utils'
import Link from 'next/link'
import React from 'react'

const PageTemplates = () => {
   const bg = app.assets.templates.hero.bg[0]
   const categories = Object.entries(sortObject(app.assets.templates.categories))

   return (
      <>
         <Meta title={trans('pages.templates.metaTitle')} description={trans('elements.templates.metaDescription')} />
         <Hero assetType={app.assets.templates} video={bg.file} bgPlaceholder={bg.placeholder} />
         <section className="mx-auto mb-10 px-4 lg:max-w-screen-xl">
            <h3 className="mb-4 text-center text-xl font-semibold leading-10 text-black after:mx-auto after:mt-2 after:block after:h-0.5 after:w-10 after:bg-blue-600 after:content-[''] md:text-2xl">
               {trans('common.exploreCategories')}
            </h3>
            <p className="mb-8 text-center text-sm font-light text-gray-600">
               {trans(`elements.${app.assets.templates.name}.descriptionAlt`)}
            </p>
            <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
               {categories.map(([name, category], key) => (
                  <li key={key}>
                     <Link
                        href={{
                           pathname: routes.page.search,
                           query: {
                              assetType: app.assets.templates.name,
                              keyword: category.keyword
                           }
                        }}
                        rel="nofollow"
                        style={{
                           backgroundImage: `url(/assets/images/category/${category.image})`
                        }}
                        className="relative block h-64 overflow-hidden rounded-md bg-cover bg-center bg-no-repeat transition duration-300 hover:opacity-90"
                     >
                        <h4 className="absolute bottom-4 left-4 rounded-md bg-white px-4 py-2 text-sm font-medium text-black">
                           {category.title}
                        </h4>
                     </Link>
                  </li>
               ))}
            </ul>
         </section>
      </>
   )
}

export default PageTemplates
