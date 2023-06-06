import { A } from '@components/common'
import { MainNav, MobileNav } from '@components/template'
import { navigations, routes, test } from '@constants/index'
import { useAppContext } from '@contexts/app'
import { Menu, Transition } from '@headlessui/react'
import IconBookmark from '@icons/bookmark.svg'
import IconChevronDown from '@icons/chevron-down.svg'
import IconHeart from '@icons/heart.svg'
import IconUserCircle from '@icons/user-circle.svg'
import { testId, trans } from '@lib/utils'
import Logo from '@svg/logo.svg'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { Fragment } from 'react'

const Header = () => {
   const AppContext = useAppContext()
   const { data: session, status: sessionState } = useSession()

   return (
      <header className="flex h-16 items-center gap-4 bg-white px-4 shadow-sm transition">
         <div className="relative z-20 -mt-0.5">
            <Link href={routes.page.home} className="block flex h-16 items-center">
               <Logo className=" h-[1.125rem]" />
            </Link>
         </div>
         <MainNav />
         <ul className="ml-auto flex items-center">
            <li>
               <Link
                  href={
                     sessionState === 'authenticated'
                        ? routes.page.account.collections.list
                        : routes.page.account.signIn
                  }
                  onClick={AppContext.redirectAfterAuth}
                  rel="nofollow"
                  data-tooltip={trans('common.collections')}
                  data-tooltip-placement="bottom"
                  className="flex h-9 rounded-md px-3 py-2 text-gray-400 transition hover:bg-gray-100 hover:text-blue-600"
               >
                  <IconBookmark className="fill-current" width="18" />
               </Link>
            </li>
            <li>
               <Link
                  href={sessionState === 'authenticated' ? routes.page.account.likes : routes.page.account.signIn}
                  onClick={AppContext.redirectAfterAuth}
                  rel="nofollow"
                  data-tooltip={trans('common.likes')}
                  data-tooltip-placement="bottom"
                  className="flex h-9 rounded-md px-3 py-2 text-gray-400 transition hover:bg-gray-100 hover:text-pink-500"
               >
                  <IconHeart className="fill-current" width="16" />
               </Link>
            </li>
         </ul>
         <hr className="-mx-3 w-5 rotate-90 border-gray-200" />
         {sessionState === 'loading' && (
            <div className="flex animate-pulse items-center space-x-3 max-md:hidden">
               <svg
                  className="h-8 w-8 text-gray-200"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     fillRule="evenodd"
                     d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                     clipRule="evenodd"
                  ></path>
               </svg>
               <div className="h-2 w-20 rounded-full bg-gray-200"></div>
            </div>
         )}
         {sessionState === 'authenticated' && (
            <Menu data-test-id={testId(test.elements.userMenu)}>
               <div className="relative max-md:hidden">
                  <Menu.Button className="group flex h-9 items-center gap-2.5 rounded-md px-3 py-2 text-sm text-gray-400 transition hover:bg-gray-100 hover:text-blue-500">
                     <IconUserCircle width="21" className="fill-current" />
                     <span className="text-gray-500/80 group-hover:text-inherit">{session.user?.name}</span>
                     <IconChevronDown className="h-2 fill-current sm:h-2.5" />
                  </Menu.Button>
                  <Transition
                     as={Fragment}
                     enter="transition ease-out duration-100"
                     enterFrom="transform opacity-0 scale-95"
                     enterTo="transform opacity-100 scale-100"
                     leave="transition ease-in duration-75"
                     leaveFrom="transform opacity-100 scale-100"
                     leaveTo="transform opacity-0 scale-95"
                  >
                     <Menu.Items className="absolute right-0 z-20 mt-2 w-auto origin-top-right rounded-lg bg-white p-3 shadow-lg ring-1 ring-gray-100 focus:outline-none sm:w-48">
                        {Object.values(navigations.account).map((item, key) => (
                           <Menu.Item key={key}>
                              <A
                                 href={item.route}
                                 className="block cursor-pointer whitespace-nowrap rounded-md px-2 py-1.5 text-xs text-gray-500 transition hover:bg-gray-100 hover:text-blue-600 sm:rounded-lg sm:px-3.5 sm:py-2 sm:text-sm"
                              >
                                 {item.label}
                              </A>
                           </Menu.Item>
                        ))}
                        <hr className="my-2" />
                        <Menu.Item>
                           <button
                              type="button"
                              onClick={AppContext.signOut}
                              className="block w-full cursor-pointer whitespace-nowrap rounded-md px-2 py-1.5 text-left text-xs text-red-500 transition hover:bg-red-50 sm:rounded-lg sm:px-3.5 sm:py-2 sm:text-sm"
                              data-test-id={testId(test.elements.signOutButton)}
                           >
                              {trans('common.signOut')}
                           </button>
                        </Menu.Item>
                     </Menu.Items>
                  </Transition>
               </div>
            </Menu>
         )}
         {sessionState === 'unauthenticated' && (
            <ul className="flex items-center gap-3 max-md:hidden">
               <li>
                  <Link
                     href={routes.page.account.signIn}
                     onClick={AppContext.redirectAfterAuth}
                     className="rounded-lg px-5 py-2 text-center text-sm text-gray-500 transition hover:bg-gray-100 hover:text-blue-600"
                  >
                     {trans('common.signIn')}
                  </Link>
               </li>
               <li>
                  <Link
                     href={routes.page.account.signUp}
                     onClick={AppContext.redirectAfterAuth}
                     className="rounded-lg bg-blue-600 px-5 py-2 text-center text-sm text-white transition hover:bg-blue-500"
                  >
                     {trans('common.signUp')}
                  </Link>
               </li>
            </ul>
         )}
         <MobileNav />
      </header>
   )
}

export default Header
