import { ProviderLogo } from '@components/template'
import IconBookmark from '@icons/bookmark.svg'
import IconDownload from '@icons/download.svg'
import IconHeart from '@icons/heart.svg'
import IconPremium from '@icons/premium.svg'
import { TemplateSearchResultsAssetType } from '@lib/templates/types'
import { arrayColumnize, cloneDeep, errorHandler, isFilled, trans } from '@lib/utils'
import { CollectionType } from '@services/collectionService/types'
import { LikedAssetType } from '@services/likeService/types'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

type PropsType = {
   foundAssets: TemplateSearchResultsAssetType[]
   collections: CollectionType[]
   likedAssets: LikedAssetType[]
   handleSave: ({ asset }: any) => void
   handleLike: ({ asset }: any) => void
}

const TemplateResults = ({ foundAssets, collections, handleSave, likedAssets, handleLike }: PropsType) => {
   const { status: session } = useSession()

   const assetErrorRef = useRef<number>(0)
   const listRef = useRef<HTMLElement>(null)

   const [likeLoading, setLikeLoading] = useState('')
   const [assets, setAssets] = useState<TemplateSearchResultsAssetType[][]>([])

   let columns: number = 1

   if (window.innerWidth > 1600) {
      columns = 5
   } else if (window.innerWidth > 1400) {
      columns = 4
   } else if (window.innerWidth > 991) {
      columns = 3
   } else if (window.innerWidth > 520) {
      columns = 2
   }

   useEffect(() => {
      if (assets.length) {
         const clonedAssets = cloneDeep(assets)
         const slicedAssets = foundAssets.slice(clonedAssets.flat().length)
         const lengths = [...clonedAssets.map(column => column.length)]

         let i = lengths.indexOf(Math.min(...lengths)) || 0

         slicedAssets.forEach(asset => {
            if (i === columns) i = 0

            clonedAssets[i].push(asset)

            i++
         })

         setAssets(clonedAssets)
      } else if (foundAssets.length) {
         setAssets(arrayColumnize(foundAssets, columns))
      }
   }, [foundAssets])

   const adjustColumns = () => {
      if (listRef.current && window.innerWidth > 420) {
         const heights: number[] = []
         const elements: NodeListOf<HTMLLIElement> = listRef.current.querySelectorAll(':scope > ul')

         if (elements.length) {
            elements.forEach((col, i) => {
               heights.push(col.offsetHeight)
            })

            const shortest = Math.min(...heights)
            const shortestIndex = heights.indexOf(shortest)

            const tallest = Math.max(...heights)
            const tallestIndex = heights.indexOf(tallest)

            if (tallest - shortest > 500) {
               const shortestColumn = listRef.current.querySelector(`:scope > ul:nth-child(${shortestIndex + 1})`)
               const lastItemOfTallest = listRef.current.querySelector(
                  `:scope > ul:nth-child(${tallestIndex + 1}) > li:last-child`
               )

               shortestColumn?.append(lastItemOfTallest as HTMLLIElement)
            }
         }
      }
   }

   const onImageLoaded = async () => {
      adjustColumns()
   }

   const onImageError = async (e: any) => {
      if (assetErrorRef.current !== -1) assetErrorRef.current++

      if (assetErrorRef.current >= 10) {
         try {
            errorHandler(new Error('Stale content'))
         } catch (error) {}

         assetErrorRef.current = -1
      }

      e.target?.closest('li')?.remove()
   }

   const onSaveClick = async (asset: TemplateSearchResultsAssetType) => {
      await handleSave({ asset })
   }

   const savedAssets = collections
      ?.map(m => m.assets)
      .filter(f => isFilled(f))
      .flat()

   const isSaved = (asset: TemplateSearchResultsAssetType) => {
      if (!savedAssets?.length) return false

      return savedAssets.find(savedAsset => {
         return asset.assetUrl === savedAsset.assetUrl
      })
   }

   const onLikeClick = async (asset: TemplateSearchResultsAssetType) => {
      if (session === 'authenticated') {
         setLikeLoading(asset.assetUrl)
      }

      await handleLike({ asset })

      setLikeLoading('')
   }

   const isLiked = (asset: TemplateSearchResultsAssetType) => {
      return likedAssets?.filter(likedAsset => {
         return likedAsset.assetUrl === asset.assetUrl
      }).length
   }

   return (
      <article ref={listRef} className={`grid grid-cols-${columns} mb-12 gap-4`}>
         {assets.map((assets, col) => (
            <ul key={col} className="flex h-max flex-col gap-4">
               {assets.map((asset, index) => (
                  <li key={`${col}-${index}`}>
                     <figure
                        className="group relative overflow-hidden rounded-md before:pointer-events-none before:absolute before:inset-0 before:z-2 before:rounded-md before:bg-black before:opacity-0 before:transition before:content-[''] hover:before:opacity-30"
                        data-provider={asset.provider}
                     >
                        <i className="block"></i>
                        <a
                           href={asset.assetUrl}
                           target="_blank"
                           rel="nofollow"
                           className="flex min-h-[7.5rem] items-center rounded-md ring-1 ring-inset ring-gray-200"
                        >
                           <Image
                              onLoadingComplete={onImageLoaded}
                              onError={onImageError}
                              src={asset.thumbnailUrl}
                              alt={asset.title || ''}
                              width={400}
                              height={300}
                              priority={index < 5 ? true : undefined}
                              unoptimized={true}
                              className="h-auto w-full"
                           />
                        </a>
                        {asset.title && <figcaption className="sr-only">{asset.title}</figcaption>}
                        <ul className="pointer-events-none absolute left-1/2 top-4 z-5 flex -translate-x-1/2 items-center gap-1 opacity-0 group-hover:opacity-100">
                           <li className="flex h-7 items-center rounded-full bg-white px-3">
                              <ProviderLogo provider={asset.provider} />
                           </li>
                           <li className="flex h-7 items-center rounded-full bg-white px-3">
                              {asset.premium ? (
                                 <IconPremium className="h-3 fill-current" />
                              ) : (
                                 <span className="text-xs">{trans('common.free')}</span>
                              )}
                           </li>
                        </ul>
                        <ul className="absolute bottom-4 left-1/2 z-5 flex -translate-x-1/2 items-center justify-center text-gray-700 opacity-0 group-hover:opacity-100">
                           <li>
                              <button
                                 type="button"
                                 onClick={() => onSaveClick(asset)}
                                 data-tooltip={isSaved(asset) ? trans('common.saved') : trans('common.save')}
                                 data-tooltip-theme="light"
                                 className={`flex h-9 items-center rounded-l-full bg-white pl-4 pr-2.5 transition ${
                                    isSaved(asset) ? 'text-blue-600' : 'hover:bg-slate-100 hover:text-blue-500'
                                 }`}
                              >
                                 <IconBookmark className="fill-current" width="18" />
                              </button>
                           </li>
                           {asset.downloadUrl && (
                              <li>
                                 <a
                                    href={asset.downloadUrl}
                                    rel="nofollow"
                                    target="_blank"
                                    data-tooltip={trans('common.download')}
                                    data-tooltip-theme="light"
                                    className={`flex h-9 items-center bg-white px-2.5 transition hover:bg-slate-100 hover:text-black disabled:cursor-progress disabled:opacity-75`}
                                 >
                                    <IconDownload className="fill-current" width="14" />
                                 </a>
                              </li>
                           )}
                           <li>
                              <button
                                 type="button"
                                 onClick={() => onLikeClick(asset)}
                                 data-tooltip={isLiked(asset) ? trans('common.liked') : trans('common.like')}
                                 data-tooltip-theme="light"
                                 disabled={likeLoading === asset.assetUrl}
                                 className={`flex h-9 items-center rounded-r-full bg-white pl-2.5 pr-4 transition disabled:cursor-progress disabled:opacity-75 ${
                                    isLiked(asset) ? 'text-red-500' : 'hover:bg-slate-100 hover:text-red-500'
                                 }`}
                              >
                                 <IconHeart className="fill-current" width="16" />
                              </button>
                           </li>
                        </ul>
                     </figure>
                  </li>
               ))}
            </ul>
         ))}
      </article>
   )
}

export default TemplateResults
