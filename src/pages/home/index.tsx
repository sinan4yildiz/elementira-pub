import { Meta } from '@components/common'
import { SearchFormHero } from '@components/search'
import { SearchFormAssetType } from '@components/search/SearchFormHero'
import { ProviderLogo } from '@components/template'
import { app, routes } from '@constants/index'
import { isFilled, sortObject, trans } from '@lib/utils'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import SVGHotAirBalloons from '@svg/hot-air-balloons.svg'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

const PageHome = () => {
   const h1Ref = useRef<HTMLHeadingElement>(null)
   const [assetType, setAssetType] = useState<SearchFormAssetType>(app.assets.images)
   const tickers = Object.entries(app.assets).map(([name]) => trans(`elements.${name}.tickerHeading`))

   const onAssetTypeChange = (assetType: SearchFormAssetType) => {
      setAssetType(assetType)
   }

   useEffect(() => {
      const h1Interval = setInterval(() => {
         tickers.push(tickers.shift() as string)

         if (h1Ref.current) {
            h1Ref.current.querySelector('mark')!.innerText = tickers[0]
         }
      }, 3000)

      return () => {
         clearInterval(h1Interval)
      }
   }, [tickers])

   return (
      <>
         <Meta page="home" title={trans('pages.home.metaTitle')} description={trans('elements.all.metaDescription')} />
         <section className="relative mx-auto px-4 pt-8 lg:max-w-screen-xl lg:pt-14">
            <div className="mb-4 flex justify-center">
               <SVGHotAirBalloons className="h-auto w-[4.5rem] md:w-24" />
            </div>
            <article>
               <h1
                  ref={h1Ref}
                  className="mb-4 text-center text-[1.625rem] font-semibold text-black md:text-5xl md:leading-snug"
                  dangerouslySetInnerHTML={{
                     __html: trans('pages.home.heroHeading', {
                        ticker: `<mark class="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 inline-block text-transparent bg-clip-text">${tickers[0]}</mark>`,
                        highlight: ''
                     })
                  }}
               ></h1>
               <SearchFormHero assetType={app.assets.images} selectable={true} onChange={onAssetTypeChange} />
               {isFilled(assetType.providers) && (
                  <ul className="mt-6 grid h-10 grid-flow-col place-items-center items-center gap-10 px-4 max-lg:overflow-x-auto lg:mt-16 lg:justify-center xl:gap-14">
                     {Object.entries(assetType.providers)
                        .slice(0, 10)
                        .map(([name, provider]) => (
                           <li key={name} className="min-w-max">
                              <ProviderLogo provider={name as never} className="scale-125" />
                           </li>
                        ))}
                  </ul>
               )}
            </article>
         </section>
         <section className="mx-auto mt-6 px-4 pb-5 lg:mt-20 lg:max-w-screen-xl">
            <h2 className="mb-4 text-center text-xl font-semibold leading-10 text-black after:mx-auto after:mt-2 after:block after:h-0.5 after:w-10 after:bg-blue-600 after:content-[''] md:text-2xl">
               {trans('common.exploreCategories')}
            </h2>
            {Object.entries(app.assets).map(([name, assetType]) => (
               <article key={name} className="mb-10">
                  <h2 className="mb-3 text-lg font-medium text-black md:text-xl">{assetType.title}</h2>
                  <div>
                     <Splide
                        options={{
                           rewind: true,
                           perPage: 4,
                           breakpoints: {
                              520: { perPage: 2 },
                              768: { perPage: 3, arrows: false },
                              1200: { perPage: 4 }
                           },
                           gap: '1rem'
                        }}
                     >
                        {Object.entries(sortObject(assetType.categories)).map(([name, category], key) => (
                           <SplideSlide key={key}>
                              <Link
                                 href={{
                                    pathname: routes.page.search,
                                    query: {
                                       assetType: assetType.name,
                                       keyword: category.keyword
                                    }
                                 }}
                                 rel="nofollow"
                                 style={{
                                    backgroundImage: `url(/assets/images/category/${category.image})`
                                 }}
                                 className="relative block h-48 overflow-hidden rounded-md bg-cover bg-center bg-no-repeat transition duration-300 hover:opacity-90 sm:h-64"
                              >
                                 <h4 className="absolute bottom-3 left-3 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-black sm:px-4 sm:py-2 sm:text-sm">
                                    {category.title}
                                 </h4>
                              </Link>
                           </SplideSlide>
                        ))}
                     </Splide>
                  </div>
               </article>
            ))}
         </section>
      </>
   )
}

export default PageHome
