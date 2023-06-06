import { NavigationItemType, NavigationsType } from '@constants/navigations/types'
import routes from '@constants/routes'
import { trans } from '@lib/utils'

const mainMenu: NavigationItemType = {
   images: {
      route: routes.page.images,
      label: trans('elements.images.title')
   },
   video: {
      route: routes.page.video,
      label: trans('elements.video.title')
   },
   music: {
      route: routes.page.music,
      label: trans('elements.music.title')
   },
   soundEffects: {
      route: routes.page.soundEffects,
      label: trans('elements.soundEffects.title')
   },
   graphics: {
      route: routes.page.graphics,
      label: trans('elements.graphics.title')
   },
   templates: {
      route: routes.page.templates,
      label: trans('elements.templates.title')
   }
}

const accountMenu: NavigationItemType = {
   likes: {
      route: routes.page.account.likes,
      label: trans('pages.likes.metaTitle')
   },
   collections: {
      route: routes.page.account.collections.list,
      label: trans('pages.collections.list.metaTitle')
   },
   profile: {
      route: routes.page.account.profile,
      label: trans('pages.profile.title')
   }
}

const footerMenu: NavigationItemType = {
   howItWorks: {
      route: routes.page.howItWorks,
      label: trans('pages.howItWorks.metaTitle')
   },
   about: {
      route: routes.page.about,
      label: trans('pages.about.metaTitle'),
      className: 'max-sm:hidden'
   },
   contact: {
      route: routes.page.contact,
      label: trans('pages.contact.metaTitle')
   },
   licence: {
      route: routes.page.licence,
      label: trans('pages.licence.metaTitle')
   },
   privacyPolicy: {
      route: routes.page.privacyPolicy,
      label: trans('pages.privacyPolicy.metaTitle')
   },
   termsOfUse: {
      route: routes.page.termsOfUse,
      label: trans('pages.termsOfUse.metaTitle')
   },
   cookies: {
      route: routes.page.cookies,
      label: trans('pages.cookies.metaTitle')
   }
}

const navigations: NavigationsType = {
   mainMenu: mainMenu,
   account: accountMenu,
   footer: footerMenu
}

export default navigations
