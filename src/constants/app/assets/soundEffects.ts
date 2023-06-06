import { soundEffectCategoryFilter, soundEffectDurationFilter } from '@components/search/soundEffects/filters/objects'
import { AppAssetFilterType, AppAssetType } from '@constants/app/types'
import { soundEffectAutocomplete, soundEffectProviders, soundEffectRelatedKeywords } from '@lib/soundEffects'
import { SoundEffectFiltersType, SoundEffectSearchParamSortType } from '@lib/soundEffects/types'
import { trans } from '@lib/utils'

const soundEffectAsset: AppAssetType = {
   name: 'soundEffects',
   title: trans('elements.soundEffects.title'),
   hero: {
      bg: [
         {
            file: 'tunnel.mp4',
            placeholder:
               'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABVAAD/4QMyaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMSA3OS5jMDIwNGIyZGVmLCAyMDIzLzAyLzAyLTEyOjE0OjI0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MjM2NjI3REY1MDYxMUVEQTAwNEUyNUUwMkRGRENBOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5MjM2NjI3RUY1MDYxMUVEQTAwNEUyNUUwMkRGRENBOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjkyMzY2MjdCRjUwNjExRURBMDA0RTI1RTAyREZEQ0E4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjkyMzY2MjdDRjUwNjExRURBMDA0RTI1RTAyREZEQ0E4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwUDBAQEBAMFBQUGBgYFBQcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBQUHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgACgAZAwERAAIRAQMRAf/EAHsAAAEFAAAAAAAAAAAAAAAAAAQBAgMFCQEAAwEBAQAAAAAAAAAAAAAAAgMFAQQHEAAAAwUGBgMAAAAAAAAAAAAAAQMRMQIEBkHREjI0BSFCghMzk1SVFhEAAgECBAYDAAAAAAAAAAAAAAECEQNBUYEEITGRwTITQpIV/9oADAMBAAIRAxEAPwDDEqgqBVsSkyucTT4mrHePT/fduJuUdREYoUt73lhRnNr48LWd9S8c6iqVpxpmC26jY6hqBJPGnMrlEVvdUvD1fu20nGOocoJkv6yrvnTHtjvG/p7jMX6o5Bm5+eLRPPI54pb7yx7ALUAS1aukszZekQ/lgPeHMLkfMWkfzOFnZeS59hD1Ln68WvqZ1P/Z'
         }
      ]
   },
   featuredKeywords: ['Ambiance', 'Space', 'Mechanic', 'Animals', 'Creatures', 'Crowds', 'Magic', 'Interface'],
   categories: {
      animals: {
         title: trans('filters.category.animals'),
         keyword: 'animals',
         image: 'bird.webp'
      },
      game: {
         title: trans('filters.category.game'),
         keyword: 'game',
         image: 'game.webp'
      },
      nature: {
         title: trans('filters.category.nature'),
         keyword: 'nature',
         image: 'nature.webp'
      },
      communication: {
         title: trans('filters.category.communication'),
         keyword: 'communication',
         image: 'communication.webp'
      },
      crowd: {
         title: trans('filters.category.crowd'),
         keyword: 'crowd',
         image: 'crowd.webp'
      },
      industrial: {
         title: trans('filters.category.industrial'),
         keyword: 'industrial',
         image: 'industrial.webp'
      },
      magic: {
         title: trans('filters.category.magic'),
         keyword: 'magic',
         image: 'magic.webp'
      },
      vehicle: {
         title: trans('filters.category.vehicle'),
         keyword: 'vehicle',
         image: 'vehicle.webp'
      }
   },
   providers: soundEffectProviders,
   autocomplete: soundEffectAutocomplete,
   relatedKeywords: soundEffectRelatedKeywords,
   sort: <SoundEffectSearchParamSortType>{
      newest: trans('sort.newest'),
      popular: trans('sort.popular'),
      relevant: trans('sort.relevant')
   },
   filters: <{ [K in keyof SoundEffectFiltersType]: AppAssetFilterType }>{
      category: {
         multiple: true,
         var: soundEffectCategoryFilter
      },
      minDuration: {
         var: soundEffectDurationFilter
      },
      maxDuration: {
         var: soundEffectDurationFilter
      }
   }
}

export default soundEffectAsset
