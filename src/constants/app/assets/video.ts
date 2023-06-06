import {
   videoAspectRatioFilter,
   videoDurationFilter,
   videoExcludeFilter,
   videoFPSFilter,
   videoLicenceFilter,
   videoNumberOfPeopleFilter,
   videoPeopleFilter,
   videoResolutionFilter,
   videoSafeSearchFilter,
   videoUsageFilter
} from '@components/search/video/filters/objects'
import { AppAssetFilterType, AppAssetType } from '@constants/app/types'
import { trans } from '@lib/utils'
import { videoAutocomplete, videoProviders, videoRelatedKeywords } from '@lib/video'
import { VideoFiltersType, VideoSearchParamSortType } from '@lib/video/types'

const videoAsset: AppAssetType = {
   name: 'video',
   title: trans('elements.video.title'),
   hero: {
      bg: [
         {
            file: 'boat.mp4',
            placeholder:
               'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABVAAD/4QMyaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMSA3OS5jMDIwNGIyZGVmLCAyMDIzLzAyLzAyLTEyOjE0OjI0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MjM2NjI3OUY1MDYxMUVEQTAwNEUyNUUwMkRGRENBOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5MjM2NjI3QUY1MDYxMUVEQTAwNEUyNUUwMkRGRENBOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjkyMzY2Mjc3RjUwNjExRURBMDA0RTI1RTAyREZEQ0E4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjkyMzY2Mjc4RjUwNjExRURBMDA0RTI1RTAyREZEQ0E4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwUDBAQEBAMFBQUGBgYFBQcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBQUHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgACgAZAwERAAIRAQMRAf/EAHwAAAIDAAAAAAAAAAAAAAAAAAUHBAYIAQADAQEAAAAAAAAAAAAAAAACBAUDBxAAAQIDBAUNAAAAAAAAAAAAAgEDAAUGETEENEEzNQcIIWGBEjJSYhOTlFU3GBEAAgICAQMFAQAAAAAAAAAAAAECAzEEBVGBNBEhYRIUFf/aAAwDAQACEQMRAD8AcNV8bG8RoDOnps0y+2lqNoIl116VjqNvHfbEvQ5DHknHKTCb3GrvBpWlpdjamnmHOdTEVeDDoIKYhZbyoKwpr11ubrbbaGtiy+Fat9lF4Aj3HzWeJOxuctgKrd5aRUjp1dBKPI2/BI/b9Y/OB6aQX5K+hp/QtMiTbNlru1pug5CU+ws8P9s4/bGWHamW05Lw97niHq+RYW97xas98FhS9NfekWYkRBj3MEbH/9k='
         },
         {
            file: 'forest.mp4',
            placeholder:
               'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABVAAD/4QMyaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMSA3OS5jMDIwNGIyZGVmLCAyMDIzLzAyLzAyLTEyOjE0OjI0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDNTVENjgxNkY1MDExMUVEODJBNkY4MDI3NDU1NUZFQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDNTVENjgxN0Y1MDExMUVEODJBNkY4MDI3NDU1NUZFQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZDNUE4RUZGRjUwMTExRUQ4MkE2RjgwMjc0NTU1RkVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZDNUE4RjAwRjUwMTExRUQ4MkE2RjgwMjc0NTU1RkVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwUDBAQEBAMFBQUGBgYFBQcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBQUHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgADgAZAwERAAIRAQMRAf/EAIgAAAIDAQAAAAAAAAAAAAAAAAUGAQIECQEAAgEFAAAAAAAAAAAAAAAABQcDAAIEBggQAAEBBgMECwAAAAAAAAAAAAIBABEDBAUGIRITQWGRFVFxgbHRMkKSFFQHEQABAwIDBgQHAAAAAAAAAAABAAIDEQQSEwUhQVFhkRQxodEG4SIyUiNTB//aAAwDAQACEQMRAD8A5mp+ZW7ZNYI6JNmssiuODHR6Km5W7tk9sW+izCWGTZwR7+Z+/Jbx+C4hLTv2I6tvIUFKhSlSNJL5hDEgXqZi6Zcw3bMUbgeIXQ3YAtzIfmaeoUwYYudtYi5gopomq+lD6GiwrIol2SOtCIc5AiFyO1VRCd38WXTcsxfm2BLXTxY5py8GPfRNdsaJmhUzMEz6hHEVTe7Diwm2hY2YGyeXO4AHzqKJm6O4H6RQ8vBFp3kcVctQywpvaULF/YD2YtvcX5bSWKjuNW+q2CTtSaSUB5fBY/jW79gvafg1Zl39o6hWdtp/7XdD6L//2Q=='
         },
         {
            file: 'petra.mp4',
            placeholder:
               'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABVAAD/4QMyaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMSA3OS5jMDIwNGIyZGVmLCAyMDIzLzAyLzAyLTEyOjE0OjI0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDNTVENjgxNkY1MDExMUVEODJBNkY4MDI3NDU1NUZFQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDNTVENjgxN0Y1MDExMUVEODJBNkY4MDI3NDU1NUZFQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZDNUE4RUZGRjUwMTExRUQ4MkE2RjgwMjc0NTU1RkVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZDNUE4RjAwRjUwMTExRUQ4MkE2RjgwMjc0NTU1RkVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwUDBAQEBAMFBQUGBgYFBQcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBQUHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgADgAZAwERAAIRAQMRAf/EAIgAAAIDAQAAAAAAAAAAAAAAAAUGAQIECQEAAgEFAAAAAAAAAAAAAAAABQcDAAIEBggQAAEBBgMECwAAAAAAAAAAAAIBABEDBAUGIRITQWGRFVFxgbHRMkKSFFQHEQABAwIDBgQHAAAAAAAAAAABAAIDEQQSEwUhQVFhkRQxodEG4SIyUiNTB//aAAwDAQACEQMRAD8A5mp+ZW7ZNYI6JNmssiuODHR6Km5W7tk9sW+izCWGTZwR7+Z+/Jbx+C4hLTv2I6tvIUFKhSlSNJL5hDEgXqZi6Zcw3bMUbgeIXQ3YAtzIfmaeoUwYYudtYi5gopomq+lD6GiwrIol2SOtCIc5AiFyO1VRCd38WXTcsxfm2BLXTxY5py8GPfRNdsaJmhUzMEz6hHEVTe7Diwm2hY2YGyeXO4AHzqKJm6O4H6RQ8vBFp3kcVctQywpvaULF/YD2YtvcX5bSWKjuNW+q2CTtSaSUB5fBY/jW79gvafg1Zl39o6hWdtp/7XdD6L//2Q=='
         },
         {
            file: 'tropic.mp4',
            placeholder:
               'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABVAAD/4QMyaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMSA3OS5jMDIwNGIyZGVmLCAyMDIzLzAyLzAyLTEyOjE0OjI0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDNTVENjgxNkY1MDExMUVEODJBNkY4MDI3NDU1NUZFQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDNTVENjgxN0Y1MDExMUVEODJBNkY4MDI3NDU1NUZFQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZDNUE4RUZGRjUwMTExRUQ4MkE2RjgwMjc0NTU1RkVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZDNUE4RjAwRjUwMTExRUQ4MkE2RjgwMjc0NTU1RkVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwUDBAQEBAMFBQUGBgYFBQcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBQUHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgADgAZAwERAAIRAQMRAf/EAIgAAAIDAQAAAAAAAAAAAAAAAAUGAQIECQEAAgEFAAAAAAAAAAAAAAAABQcDAAIEBggQAAEBBgMECwAAAAAAAAAAAAIBABEDBAUGIRITQWGRFVFxgbHRMkKSFFQHEQABAwIDBgQHAAAAAAAAAAABAAIDEQQSEwUhQVFhkRQxodEG4SIyUiNTB//aAAwDAQACEQMRAD8A5mp+ZW7ZNYI6JNmssiuODHR6Km5W7tk9sW+izCWGTZwR7+Z+/Jbx+C4hLTv2I6tvIUFKhSlSNJL5hDEgXqZi6Zcw3bMUbgeIXQ3YAtzIfmaeoUwYYudtYi5gopomq+lD6GiwrIol2SOtCIc5AiFyO1VRCd38WXTcsxfm2BLXTxY5py8GPfRNdsaJmhUzMEz6hHEVTe7Diwm2hY2YGyeXO4AHzqKJm6O4H6RQ8vBFp3kcVctQywpvaULF/YD2YtvcX5bSWKjuNW+q2CTtSaSUB5fBY/jW79gvafg1Zl39o6hWdtp/7XdD6L//2Q=='
         }
      ]
   },
   featuredKeywords: ['Aerial', 'Summer', 'Ocean', 'Animals', 'Nature', 'Space', 'Abstract', 'Lifestyle'],
   categories: {
      flowers: {
         title: trans('categories.flowers'),
         keyword: 'flowers',
         image: 'flowers.webp'
      },
      space: {
         title: trans('categories.space'),
         keyword: 'space',
         image: 'space.webp'
      },
      summer: {
         title: trans('categories.summer'),
         keyword: 'summer',
         image: 'summer.webp'
      },
      winter: {
         title: trans('categories.winter'),
         keyword: 'winter',
         image: 'winter.webp'
      },
      spring: {
         title: trans('categories.spring'),
         keyword: 'spring',
         image: 'spring.webp'
      },
      autumn: {
         title: trans('categories.autumn'),
         keyword: 'autumn',
         image: 'autumn.webp'
      },
      abstract: {
         title: trans('categories.abstract'),
         keyword: 'abstract',
         image: 'abstract.webp'
      },
      animals: {
         title: trans('categories.animals'),
         keyword: 'animals',
         image: 'animals.webp'
      },
      babies: {
         title: trans('categories.babies'),
         keyword: 'babies',
         image: 'babies.webp'
      },
      men: {
         title: trans('categories.men'),
         keyword: 'men',
         image: 'men.webp'
      },
      women: {
         title: trans('categories.women'),
         keyword: 'women',
         image: 'women.webp'
      },
      drinks: {
         title: trans('categories.drinks'),
         keyword: 'drinks',
         image: 'drinks.webp'
      },
      beauty: {
         title: trans('categories.beauty'),
         keyword: 'beauty',
         image: 'beauty.webp'
      },
      business: {
         title: trans('categories.business'),
         keyword: 'business',
         image: 'business.webp'
      },
      education: {
         title: trans('categories.education'),
         keyword: 'education',
         image: 'education.webp'
      },
      family: {
         title: trans('categories.family'),
         keyword: 'family',
         image: 'family.webp'
      },
      fashion: {
         title: trans('categories.fashion'),
         keyword: 'fashion',
         image: 'fashion.webp'
      },
      fitness: {
         title: trans('categories.fitness'),
         keyword: 'fitness',
         image: 'fitness.webp'
      },
      food: {
         title: trans('categories.food'),
         keyword: 'food',
         image: 'food.webp'
      },
      healthcare: {
         title: trans('categories.healthcare'),
         keyword: 'healthcare',
         image: 'healthcare.webp'
      },
      landscape: {
         title: trans('categories.landscape'),
         keyword: 'landscape',
         image: 'landscape.webp'
      },
      people: {
         title: trans('categories.people'),
         keyword: 'people',
         image: 'people.webp'
      },
      technology: {
         title: trans('categories.technology'),
         keyword: 'technology',
         image: 'technology.webp'
      },
      texture: {
         title: trans('categories.texture'),
         keyword: 'texture',
         image: 'texture.webp'
      },
      travel: {
         title: trans('categories.travel'),
         keyword: 'travel',
         image: 'travel.webp'
      },
      sports: {
         title: trans('categories.sports'),
         keyword: 'sports',
         image: 'sports.webp'
      },
      fruits: {
         title: trans('categories.fruits'),
         keyword: 'fruits',
         image: 'fruits.webp'
      },
      party: {
         title: trans('categories.party'),
         keyword: 'party',
         image: 'party.webp'
      },
      wedding: {
         title: trans('categories.wedding'),
         keyword: 'wedding',
         image: 'wedding.webp'
      },
      vintage: {
         title: trans('categories.vintage'),
         keyword: 'vintage',
         image: 'vintage.webp'
      },
      lifestyle: {
         title: trans('categories.lifestyle'),
         keyword: 'lifestyle',
         image: 'lifestyle.webp'
      },
      camping: {
         title: trans('categories.camping'),
         keyword: 'camping',
         image: 'camping.webp'
      }
   },
   providers: videoProviders,
   autocomplete: videoAutocomplete,
   relatedKeywords: videoRelatedKeywords,
   sort: <VideoSearchParamSortType>{
      newest: trans('sort.newest'),
      popular: trans('sort.popular'),
      relevant: trans('sort.relevant'),
      random: trans('sort.random'),
      editorsChoice: trans('sort.editorsChoice')
   },
   filters: <{ [K in keyof VideoFiltersType]: AppAssetFilterType }>{
      fps: {
         multiple: true,
         var: videoFPSFilter
      },
      aspectRatio: {
         var: videoAspectRatioFilter
      },
      resolution: {
         multiple: true,
         var: videoResolutionFilter
      },
      exclude: {
         var: videoExcludeFilter
      },
      licence: {
         var: videoLicenceFilter
      },
      minDuration: {
         var: videoDurationFilter
      },
      maxDuration: {
         var: videoDurationFilter
      },
      numberOfPeople: {
         var: videoNumberOfPeopleFilter
      },
      people: {
         var: videoPeopleFilter
      },
      safeSearch: {
         var: videoSafeSearchFilter
      },
      usage: {
         var: videoUsageFilter
      }
   }
}

export default videoAsset
