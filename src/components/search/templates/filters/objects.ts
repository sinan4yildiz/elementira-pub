import { TemplateFilterType, TemplateSearchParamAppType, TemplateSearchParamCategoryType } from '@lib/templates/types'
import { trans } from '@lib/utils'

export const templateCategoryFilter: TemplateFilterType<TemplateSearchParamCategoryType> = {
   name: 'category',
   label: trans('filters.category.label'),
   options: [
      {
         value: 'banner',
         label: trans('filters.category.banner')
      },
      {
         value: 'branding',
         label: trans('filters.category.branding')
      },
      {
         value: 'businessCard',
         label: trans('filters.category.businessCard')
      },
      {
         value: 'card',
         label: trans('filters.category.card')
      },
      {
         value: 'etsy',
         label: trans('filters.category.etsy')
      },
      {
         value: 'instagram',
         label: trans('filters.category.instagram')
      },
      {
         value: 'facebook',
         label: trans('filters.category.facebook')
      },
      {
         value: 'youtube',
         label: trans('filters.category.youtube')
      },
      {
         value: 'pinterest',
         label: trans('filters.category.pinterest')
      },
      {
         value: 'flyer',
         label: trans('filters.category.flyer')
      },
      {
         value: 'entertainment',
         label: trans('filters.category.entertainment')
      },
      {
         value: 'logo',
         label: trans('filters.category.logo')
      },
      {
         value: 'advertisement',
         label: trans('filters.category.advertisement')
      },
      {
         value: 'postcard',
         label: trans('filters.category.postcard')
      },
      {
         value: 'poster',
         label: trans('filters.category.poster')
      },
      {
         value: 'presentation',
         label: trans('filters.category.presentation')
      }
   ]
}

export const templateAppFilter: TemplateFilterType<TemplateSearchParamAppType> = {
   name: 'app',
   label: trans('filters.app.label'),
   options: [
      {
         value: 'photoshop',
         label: trans('filters.app.photoshop')
      },
      {
         value: 'illustrator',
         label: trans('filters.app.illustrator')
      },
      {
         value: 'inDesign',
         label: trans('filters.app.inDesign')
      },
      {
         value: 'premierePro',
         label: trans('filters.app.premierePro')
      },
      {
         value: 'premiereRush',
         label: trans('filters.app.premiereRush')
      },
      {
         value: 'msWord',
         label: trans('filters.app.msWord')
      },
      {
         value: 'msExcel',
         label: trans('filters.app.msExcel')
      },
      {
         value: 'msPowerPoint',
         label: trans('filters.app.msPowerPoint')
      },
      {
         value: 'keynote',
         label: trans('filters.app.keynote')
      },
      {
         value: 'googleSheets',
         label: trans('filters.app.googleSheets')
      },
      {
         value: 'googleSlides',
         label: trans('filters.app.googleSlides')
      }
   ]
}
