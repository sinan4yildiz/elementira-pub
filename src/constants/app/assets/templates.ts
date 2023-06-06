import { templateAppFilter, templateCategoryFilter } from '@components/search/templates/filters/objects'
import { AppAssetFilterType, AppAssetType } from '@constants/app/types'
import { templateAutocomplete, templateProviders, templateRelatedKeywords } from '@lib/templates'
import { TemplateFiltersType, TemplateSearchParamSortType } from '@lib/templates/types'
import { trans } from '@lib/utils'

const templateAsset: AppAssetType = {
   name: 'templates',
   title: trans('elements.templates.title'),
   hero: {
      bg: [
         {
            file: 'sale.mp4',
            placeholder:
               'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABVAAD/4QMyaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMSA3OS5jMDIwNGIyZGVmLCAyMDIzLzAyLzAyLTEyOjE0OjI0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGREVCMzJEMEY1MDYxMUVEQTAwNEUyNUUwMkRGRENBOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGREVCMzJEMUY1MDYxMUVEQTAwNEUyNUUwMkRGRENBOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjkyMzY2MjdGRjUwNjExRURBMDA0RTI1RTAyREZEQ0E4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjkyMzY2MjgwRjUwNjExRURBMDA0RTI1RTAyREZEQ0E4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwUDBAQEBAMFBQUGBgYFBQcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBQUHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgACgAZAwERAAIRAQMRAf/EAI4AAQADAAAAAAAAAAAAAAAAAAcFBggBAAICAwAAAAAAAAAAAAAAAAQFBgcBAwgQAAADBAUICgMAAAAAAAAAAAECBQADBAYRMjM0ByExQVFhImI1wdESQhOTlFU2NwgYCREAAQICBgcJAQAAAAAAAAAAAQADAgQRMVEyBQYhQWFxgZESwUKSM1M0FTUHF//aAAwDAQACEQMRAD8AVsSZhdYafjesPFFM8BYVnzuDg3cbQcwgbIHYDRQA0sFPxiFs7VP8hybkzibQhJAh0miwLE2K6DMkYtIS6mrMUiynDHF0rxEAUpzgUxaCGOUxTbgGoEwgGZlEt0E0RK889xYg0zC/JEgwXgLNymZSmOEdzVAps3FI/V02IJHJMaUQK5UnbveI8djTWDSGvZlbLrRZi6hUgMAzGxmSUil3T0vUadu0Jv8A28X/AGR15g9TbvkI7EB/MZf1DyV6/oT8alG81xr2VmNbj1MTi+pRD8j927Vd48FnUOVxNWyNeLHN39jJgugzdO7XVxQfh99nS3fLGM5rcM5eXdHBQzOZ8oKhsj/ePXK4qt/d7Uw+pYLkrt8S/9k='
         }
      ]
   },
   featuredKeywords: ['Banner', 'Branding', 'Flyers', 'Poster', 'Card', 'Advertisement', 'Presentation'],
   categories: {
      instagram: {
         title: trans('filters.category.instagram'),
         keyword: 'instagram',
         image: 'instagram.webp'
      },
      branding: {
         title: trans('filters.category.branding'),
         keyword: 'branding',
         image: 'branding.webp'
      },
      logo: {
         title: trans('filters.category.logo'),
         keyword: 'logo',
         image: 'logo.webp'
      },
      advertising: {
         title: trans('categories.advertising'),
         keyword: 'advertising',
         image: 'advertisement.webp'
      },
      banner: {
         title: trans('filters.category.banner'),
         keyword: 'banner',
         image: 'banner.webp'
      },
      presentation: {
         title: trans('filters.category.presentation'),
         keyword: 'presentation',
         image: 'presentation.webp'
      },
      card: {
         title: trans('filters.category.card'),
         keyword: 'card',
         image: 'card.webp'
      },
      flyer: {
         title: trans('filters.category.flyer'),
         keyword: 'flyer',
         image: 'flyer.webp'
      }
   },
   providers: templateProviders,
   autocomplete: templateAutocomplete,
   relatedKeywords: templateRelatedKeywords,
   sort: <TemplateSearchParamSortType>{
      newest: trans('sort.newest'),
      popular: trans('sort.popular'),
      relevant: trans('sort.relevant'),
      random: trans('sort.random')
   },
   filters: <{ [K in keyof TemplateFiltersType]: AppAssetFilterType }>{
      app: {
         multiple: true,
         var: templateAppFilter
      },
      category: {
         multiple: true,
         var: templateCategoryFilter
      }
   }
}

export default templateAsset
