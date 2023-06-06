import { SearchFormHero } from '@components/search'
import { ProviderLogo } from '@components/template/index'
import { AppAssetType } from '@constants/app/types'
import { useBreakpoints } from '@hooks/useBreakpoints'
import { isFilled, trans } from '@lib/utils'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type PropsType = {
   assetType: Omit<AppAssetType, 'Providers' | 'sort'>
   image?: string
   video?: string
   bgPlaceholder: string
}

const Hero = ({ assetType, image, video, bgPlaceholder }: PropsType) => {
   const breakpoints = useBreakpoints()
   const [bgLoaded, setBgLoaded] = useState<boolean>(false)
   const [heroVideo, setHeroVideo] = useState<string>()
   const [heroImage, setHeroImage] = useState<string>()

   const onBgLoaded = () => {
      setTimeout(() => {
         setBgLoaded(true)
      }, 500)
   }

   useEffect(() => {
      let bg = image || video

      if (window.innerWidth < 640) {
         bg = `small/${bg}`
      }

      if (image) {
         setHeroImage(bg)
      }

      if (video) {
         setHeroVideo(bg)
      }
   }, [breakpoints])

   return (
      <>
         <section className="relative max-w-full before:absolute before:inset-0 before:z-2 before:bg-black before:opacity-40 before:transition before:duration-500 before:content-['']">
            <div className="absolute inset-0 z-1 overflow-hidden transition duration-500">
               <Image
                  src={bgPlaceholder}
                  alt=""
                  width="1920"
                  height="1080"
                  unoptimized={true}
                  className={`absolute z-20 transition duration-500 max-sm:h-full max-sm:max-w-none max-xxs:w-auto sm:inset-x-0 sm:top-0 sm:w-full ${
                     bgLoaded ? 'opacity-0' : ''
                  }`}
               />

               {heroImage && (
                  <Image
                     src={`/assets/hero/images/${heroImage}`}
                     alt=""
                     width="1920"
                     height="1080"
                     onLoadingComplete={onBgLoaded}
                     priority={true}
                     className="absolute max-sm:min-h-full max-xxs:h-full max-xxs:w-auto max-xxs:max-w-none sm:inset-x-0 sm:top-0 sm:w-full md:animate-hero-bg"
                  />
               )}

               {heroVideo && (
                  <video
                     autoPlay
                     playsInline
                     muted
                     loop
                     preload="auto"
                     width="100%"
                     onPlay={onBgLoaded}
                     className="absolute left-1/2 top-0 z-1 h-full w-auto max-w-none -translate-x-1/2 2xl:h-auto 2xl:w-full"
                  >
                     <source src={`/assets/hero/video/${heroVideo}`} type="video/mp4" />
                  </video>
               )}
            </div>
            <article className="relative relative z-5 mx-auto px-4 py-14 xs:py-20 md:py-28 lg:max-w-screen-xl xl:py-40">
               <h1
                  className="mb-1.5 text-3xl font-semibold leading-10 text-white md:text-4xl xl:text-4.5xl"
                  dangerouslySetInnerHTML={{
                     __html: trans(`elements.${assetType.name}.heroHeading`)
                  }}
               ></h1>
               <h2
                  className="mb-3 font-light leading-relaxed text-white max-md:text-sm"
                  dangerouslySetInnerHTML={{
                     __html: trans(`elements.${assetType.name}.heroDescription`)
                  }}
               ></h2>
               <SearchFormHero assetType={assetType} />
            </article>
         </section>
         <section className="mb-8 mt-4 lg:mb-14 lg:mt-10">
            {isFilled(assetType.providers) && (
               <ul className="grid h-10 grid-flow-col place-items-center items-center gap-10 px-6 max-lg:overflow-x-auto lg:justify-center xl:gap-14">
                  {Object.entries(assetType.providers)
                     .slice(0, 10)
                     .map(([name, provider]) => (
                        <li key={name} className="min-w-max">
                           <ProviderLogo provider={name as never} className="scale-125" />
                        </li>
                     ))}
               </ul>
            )}
         </section>
      </>
   )
}

export default Hero
