import { A } from '@components/common'
import { navigations, routes } from '@constants/index'
import { useAppContext } from '@contexts/app'
import { useUIContext } from '@contexts/ui'
import { Menu, Transition } from '@headlessui/react'
import IconChevronDown from '@icons/chevron-down.svg'
import IconCross from '@icons/cross.svg'
import IconGrid from '@icons/grid.svg'
import { lowerCaseFirst, trans } from '@lib/utils'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'

const MobileNav = () => {
   const router = useRouter()
   const UIContext = useUIContext()
   const AppContext = useAppContext()
   const mainMenu = Object.entries(navigations.mainMenu)
   const { data: session, status: sessionState } = useSession()

   return (
      <div className="z-10 -mr-1 md:hidden">
         <button
            type="button"
            onClick={UIContext.toggleMobileNav}
            className="relative z-30 flex flex h-9 w-10 items-center justify-center rounded-md px-3 py-2 text-gray-400 transition hover:bg-gray-100 hover:text-blue-600"
         >
            {UIContext.mobileNavState ? (
               <IconCross className="fill-current" width="13" />
            ) : (
               <IconGrid className="mt-px fill-current" width="18" />
            )}
         </button>
         <Transition
            show={UIContext.mobileNavState}
            as={Fragment}
            enter="transition ease-out duration-150"
            enterFrom="transform opacity-0 translate-y-2"
            enterTo="transform opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 translate-y-2"
            leaveTo="transform opacity-0 translate-y-0"
         >
            <div className="fixed bottom-0 left-0 right-0 top-0 z-20 bg-white pb-5 pt-16">
               <div className="h-full overflow-y-auto">
                  <div className="px-5">
                     {sessionState === 'authenticated' && (
                        <div className="rounded-lg border border-gray-200">
                           <Menu>
                              <Menu.Button className="flex w-full items-center justify-center gap-3 p-4 text-lg text-black">
                                 <span>👋🏼</span>
                                 {session.user?.name}
                                 <IconChevronDown className="h-2.5 fill-gray-500" />
                              </Menu.Button>
                              <Menu.Items className="mt-2 pb-8">
                                 {Object.values(navigations.account).map((item, key) => (
                                    <Menu.Item key={key}>
                                       <Link
                                          href={item.route}
                                          className="block w-full whitespace-nowrap px-4 py-2 text-center text-lg text-gray-600"
                                       >
                                          {item.label}
                                       </Link>
                                    </Menu.Item>
                                 ))}
                                 <Menu.Item>
                                    <button
                                       type="button"
                                       onClick={AppContext.signOut}
                                       className="block w-full whitespace-nowrap px-4 py-2 text-center text-lg text-red-600"
                                    >
                                       {trans('common.signOut')}
                                    </button>
                                 </Menu.Item>
                              </Menu.Items>
                           </Menu>
                        </div>
                     )}
                     {sessionState === 'unauthenticated' && (
                        <ul className="mt-2 grid grid-cols-2 items-center gap-4 pb-2">
                           <li>
                              <Link
                                 href={routes.page.account.signIn}
                                 onClick={AppContext.redirectAfterAuth}
                                 className="text-gray-black block w-full rounded-md border border-gray-300 px-5 py-2.5 text-center text-sm font-medium"
                              >
                                 {trans('common.signIn')}
                              </Link>
                           </li>
                           <li>
                              <Link
                                 href={routes.page.account.signUp}
                                 onClick={AppContext.redirectAfterAuth}
                                 className="block w-full rounded-md border border-blue-600 bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white"
                              >
                                 {trans('common.signUp')}
                              </Link>
                           </li>
                        </ul>
                     )}
                     <ul className="mt-4 rounded-lg border border-gray-200 py-6">
                        {mainMenu.map(([assetType, item], key) => (
                           <li key={key}>
                              <A
                                 href={item.route}
                                 active={
                                    assetType === lowerCaseFirst(router.query.assetType as string) &&
                                    routes.page.search === router.pathname
                                 }
                                 className="block px-4 py-2 text-center text-lg text-black"
                                 activeClassName="text-blue-600 underline underline-offset-8"
                              >
                                 {item.label}
                              </A>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
         </Transition>
      </div>
   )
}

export default MobileNav
