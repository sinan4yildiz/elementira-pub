import { A } from '@components/common'
import { navigations, routes } from '@constants/index'
import { Menu, Transition } from '@headlessui/react'
import IconChevronDown from '@icons/chevron-down.svg'
import { lowerCaseFirst, trans } from '@lib/utils'
import { useRouter } from 'next/router'
import React from 'react'

function NavItems() {
   const router = useRouter()
   const mainMenu = Object.entries(navigations.mainMenu)

   return (
      <ul className="flex items-center gap-6 max-lg:[&>li:nth-last-child(-n+4)]:hidden">
         {mainMenu.map(([assetType, item], key) => (
            <li key={key}>
               <A
                  href={item.route}
                  active={
                     assetType === lowerCaseFirst(router.query.assetType as string) &&
                     routes.page.search === router.pathname
                  }
                  className="flex h-16 items-center border-b-2 border-transparent text-sm text-gray-500 transition hover:text-blue-600"
                  activeClassName="!text-blue-600 !border-blue-600"
               >
                  {item.label}
               </A>
            </li>
         ))}
      </ul>
   )
}

function NavMoreItems() {
   const mainMenu = Object.values(navigations.mainMenu)

   return (
      <div className="relative z-10 lg:hidden">
         <Menu>
            <Menu.Button className="flex h-16 items-center gap-3 text-md text-gray-500 transition hover:text-blue-600">
               {trans('common.more')} <IconChevronDown className="fill-current" height="10" />
            </Menu.Button>
            <Transition
               enter="transition ease-out duration-100"
               enterFrom="transform opacity-0 scale-95"
               enterTo="transform opacity-100 scale-100"
               leave="transition ease-in duration-75"
               leaveFrom="transform opacity-100 scale-100"
               leaveTo="transform opacity-0 scale-95"
            >
               <Menu.Items className="absolute -top-px left-0 z-10 w-48 origin-top-left rounded-b-lg bg-white p-3 shadow-lg max-lg:[&>a:nth-child(-n+2)]:hidden lg:[&>a:nth-child(-n+5)]:hidden">
                  {mainMenu.map((item, key) => (
                     <Menu.Item key={key}>
                        <A
                           href={item.route}
                           className="block cursor-pointer rounded-lg px-4 py-2 text-sm text-gray-500 transition hover:text-blue-600"
                           activeClassName="bg-gray-100 !text-blue-600"
                        >
                           {item.label}
                        </A>
                     </Menu.Item>
                  ))}
               </Menu.Items>
            </Transition>
         </Menu>
      </div>
   )
}

const MainNav = () => {
   return (
      <nav className="relative z-10 ml-auto flex items-center gap-6 pt-0.5 max-md:hidden xl:translate-x-14">
         <NavItems />
         <NavMoreItems />
      </nav>
   )
}

export default MainNav
