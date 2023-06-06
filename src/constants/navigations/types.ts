export type NavigationItemType = {
   [key: string]: {
      route: string
      label: string
      icon?: string
      className?: string
      children?: NavigationItemType
   }
}

export type NavigationsType<T = NavigationItemType> = {
   mainMenu: T
   account: T
   footer: T
}
