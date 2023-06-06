import IconBookmark from '@icons/bookmark.svg'
import IconHeart from '@icons/heart.svg'
import IconPause from '@icons/pause.svg'
import IconPlayNext from '@icons/play-next.svg'
import IconPlayPrevious from '@icons/play-previous.svg'
import IconPlay from '@icons/play.svg'
import { SoundEffectSearchResultsAssetType } from '@lib/soundEffects/types'
import { formatDuration, isFilled, trans } from '@lib/utils'
import { CollectionType } from '@services/collectionService/types'
import { LikedAssetType } from '@services/likeService/types'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'

type PropsType = {
   foundAssets: SoundEffectSearchResultsAssetType[]
   collections: CollectionType[]
   likedAssets: LikedAssetType[]
   handleSave: ({ asset }: any) => void
   handleLike: ({ asset }: any) => void
}

enum Status {
   INITIAL = 'INITIAL',
   LOADING = 'LOADING',
   PLAYING = 'PLAYING',
   PAUSED = 'PAUSED'
}

const SoundEffectResults = ({ foundAssets, collections, handleSave, likedAssets, handleLike }: PropsType) => {
   const { status: session } = useSession()
   const [likeLoading, setLikeLoading] = useState('')
   const waveSurferRef = useRef<WaveSurfer | null>(null)
   const waveFormRef = useRef<HTMLDivElement | null>(null)
   const playerRef = useRef<HTMLDivElement | null>(null)
   const playButtonRef = useRef<HTMLButtonElement | null>(null)
   const [status, setStatus] = useState<Status>(Status.INITIAL)
   const [active, setActive] = useState<SoundEffectSearchResultsAssetType>()
   const [playing, setPlaying] = useState<string | undefined>()

   const onSaveClick = async (asset: SoundEffectSearchResultsAssetType) => {
      await handleSave({ asset })
   }

   const savedAssets = collections
      ?.map(m => m.assets)
      .filter(f => isFilled(f))
      .flat()

   const isSaved = (asset: SoundEffectSearchResultsAssetType) => {
      if (!savedAssets?.length) return false

      return savedAssets.find(savedAsset => {
         return asset.assetUrl === savedAsset.assetUrl
      })
   }

   const onLikeClick = async (asset: SoundEffectSearchResultsAssetType) => {
      if (session === 'authenticated') {
         setLikeLoading(asset.assetUrl)
      }

      await handleLike({ asset })

      setLikeLoading('')
   }

   const isLiked = (asset: SoundEffectSearchResultsAssetType) => {
      return likedAssets?.filter(likedAsset => {
         return likedAsset.assetUrl === asset.assetUrl
      }).length
   }

   const playPause = (asset: SoundEffectSearchResultsAssetType = foundAssets[0]) => {
      // setPlaying(isPlaying(asset.id) ? undefined : asset.id)

      if (active?.id === asset.id) {
         waveSurferRef.current?.playPause()
      } else {
         setActive(asset)
      }
   }

   const play = () => {
      if (!active || !waveSurferRef.current) return

      setStatus(Status.LOADING)

      waveSurferRef.current?.load(active?.previewUrl)

      waveSurferRef.current?.on('ready', function () {
         waveSurferRef.current?.play()
      })

      waveSurferRef.current?.on('play', function () {
         setPlaying(active.id)

         setStatus(Status.PLAYING)
      })

      waveSurferRef.current?.on('pause', function () {
         setStatus(Status.PAUSED)
      })

      waveSurferRef.current?.on('loading', function () {
         setStatus(Status.LOADING)
      })

      waveSurferRef.current?.on('finish', function () {
         setStatus(Status.PAUSED)
      })
   }

   const pause = () => {
      waveSurferRef.current?.pause()
   }

   const prevNext = (action = false) => {
      if (!active) return

      let li: any = document.getElementById(active?.id) as HTMLLIElement

      li = action ? li?.nextSibling : li?.previousSibling

      if (li) {
         for (const asset of foundAssets) {
            if (asset.id === li.id) {
               setActive(asset)

               break
            }
         }
      }
   }

   const isPlaying = (id: string) => {
      return status === Status.PLAYING && playing === id
   }

   const onSpacebarPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
         e.preventDefault()

         playButtonRef.current?.click()
      }
   }

   useEffect(() => {
      if (!waveSurferRef.current && waveFormRef.current) {
         waveSurferRef.current = WaveSurfer.create({
            container: waveFormRef.current,
            waveColor: '#a8acb2',
            progressColor: '#2563eb',
            cursorColor: '#7ba4ff',
            height: 50
         })
      }

      if (active) play()
      else pause()
   }, [active])

   useEffect(() => {
      window.addEventListener('keydown', onSpacebarPress)

      return () => {
         pause()

         window.removeEventListener('keydown', onSpacebarPress)
      }
   }, [])

   return (
      <article className="xl:mx-auto xl:w-[70rem]">
         <ul className="mb-12 flex flex-col gap-4">
            {foundAssets.map((asset, index) => (
               <li
                  id={asset.id}
                  key={index}
                  className={`flex items-center gap-6 rounded-lg bg-white px-6 py-5 shadow-sm max-md:flex-wrap ${
                     isPlaying(asset.id) ? 'ring-1 ring-blue-500 ring-offset-4' : ''
                  }`}
               >
                  <div className="flex items-center gap-6">
                     <div className="min-w-[2.5rem]">
                        <button
                           type="button"
                           onClick={() => playPause(asset)}
                           className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                              isPlaying(asset.id)
                                 ? 'bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2'
                                 : 'bg-blue-100/75 text-blue-600 hover:bg-blue-100'
                           }`}
                        >
                           {isPlaying(asset.id) ? (
                              <IconPause className="h-4 w-4 fill-current" />
                           ) : (
                              <IconPlay className="h-4 w-4 fill-current" />
                           )}
                        </button>
                     </div>
                     <div className="flex flex-col items-start">
                        <a
                           href={asset.assetUrl}
                           target="_blank"
                           rel="nofollow"
                           className="block text-md font-medium text-black transition hover:text-blue-600"
                        >
                           <h3>{asset.title}</h3>
                        </a>
                        {asset.creator && (
                           <span className="text-xs font-light text-gray-500">
                              {trans('common.by')} {asset.creator}
                           </span>
                        )}
                     </div>
                  </div>
                  {/*{asset.waveForm &&
                     <div onClick={() => playPause(asset)} className="max-md:hidden ml-auto w-80 h-10 cursor-pointer opacity-75 hover:opacity-100 transition" style={{
                        background: `url(${asset.waveForm}) no-repeat top`,
                        backgroundSize: '100% 10rem'
                     }}></div>}*/}
                  <div className="ml-auto flex items-center gap-6 max-md:w-full">
                     <div className="flex flex-col gap-1">
                        <span className="text-xs font-light text-gray-500">{trans('filters.duration.label')}</span>
                        <span className="text-int font-semibold text-gray-700">{formatDuration(asset.duration)}</span>
                     </div>
                     <div className="flex items-center gap-4">
                        <button
                           type="button"
                           onClick={() => onSaveClick(asset)}
                           data-tooltip={isSaved(asset) ? trans('common.saved') : trans('common.save')}
                           className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                              isSaved(asset)
                                 ? 'bg-blue-600 text-white'
                                 : 'bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                           }`}
                        >
                           <IconBookmark className="fill-current" width="18" />
                        </button>
                        <button
                           type="button"
                           onClick={() => onLikeClick(asset)}
                           data-tooltip={isLiked(asset) ? trans('common.liked') : trans('common.like')}
                           disabled={likeLoading === asset.assetUrl}
                           className={`flex h-9 w-9 items-center justify-center rounded-full transition disabled:cursor-progress disabled:opacity-75 ${
                              isLiked(asset)
                                 ? 'bg-red-500 text-white'
                                 : 'bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-500'
                           }`}
                        >
                           <IconHeart className="fill-current" width="16" />
                        </button>
                     </div>
                  </div>
               </li>
            ))}
         </ul>

         {isFilled(foundAssets) && (
            <div
               ref={playerRef}
               className="fixed bottom-0 left-0 z-7 flex items-center justify-center gap-x-2 bg-slate-700 px-4 shadow max-md:right-0 max-md:flex-wrap max-md:py-4 md:bottom-2 md:left-1/2 md:h-16 md:-translate-x-1/2 md:gap-x-4 md:rounded-full"
            >
               <div className="flex items-center gap-3">
                  <button
                     type="button"
                     tabIndex={-1}
                     onClick={() => prevNext()}
                     className={`flex h-10 w-10 items-center justify-center rounded-full text-gray-300 transition hover:bg-slate-600`}
                  >
                     <IconPlayPrevious className="h-4 w-4 fill-current" />
                  </button>
                  <button
                     type="button"
                     ref={playButtonRef}
                     onClick={() => playPause(active as never)}
                     className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                        status === Status.PLAYING
                           ? 'bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2'
                           : 'bg-slate-600 text-white hover:bg-slate-500'
                     }`}
                  >
                     {status === Status.PLAYING ? (
                        <IconPause className="h-4 w-4 fill-current" />
                     ) : status === Status.LOADING ? (
                        <span className="spinner h-5 w-5 border-2 border-slate-200"></span>
                     ) : (
                        <IconPlay className="h-4 w-4 fill-current" />
                     )}
                  </button>
                  <button
                     type="button"
                     tabIndex={-1}
                     onClick={() => prevNext(true)}
                     className={`flex h-10 w-10 items-center justify-center rounded-full text-gray-300 transition hover:bg-slate-600`}
                  >
                     <IconPlayNext className="h-4 w-4 fill-current" />
                  </button>
               </div>
               <div
                  ref={waveFormRef}
                  className={`${active ? 'w-full max-md:order-2 max-md:-mb-4 max-md:flex-grow md:w-60' : 'hidden'}`}
               ></div>
               {active && (
                  <>
                     <span className="w-14 text-center text-int text-slate-100 max-md:hidden">
                        {formatDuration(active.duration)}
                     </span>
                     <div className="ml-auto flex items-center gap-3">
                        <button
                           type="button"
                           onClick={() => onSaveClick(active)}
                           data-tooltip={isSaved(active) ? trans('common.saved') : trans('common.save')}
                           className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                              isSaved(active)
                                 ? 'bg-blue-600 text-white'
                                 : 'bg-slate-600 text-white hover:bg-white hover:text-blue-600'
                           }`}
                        >
                           <IconBookmark className="fill-current" width="18" />
                        </button>
                        <button
                           type="button"
                           onClick={() => onLikeClick(active)}
                           data-tooltip={isLiked(active) ? trans('common.liked') : trans('common.like')}
                           disabled={likeLoading === active.assetUrl}
                           className={`flex h-9 w-9 items-center justify-center rounded-full transition disabled:cursor-progress disabled:opacity-75 ${
                              isLiked(active)
                                 ? 'bg-red-500 text-white'
                                 : 'bg-slate-600 text-white hover:bg-white hover:text-red-500'
                           }`}
                        >
                           <IconHeart className="fill-current" width="16" />
                        </button>
                     </div>
                  </>
               )}
            </div>
         )}
      </article>
   )
}

export default SoundEffectResults
