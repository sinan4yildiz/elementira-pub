import {
   musicDurationFilter,
   musicGenreFilter,
   musicInstrumentFilter,
   musicLoopableFilter,
   musicMoodFilter,
   musicTempoFilter,
   musicVocalFilter
} from '@components/search/music/filters/objects'
import { AppAssetFilterType, AppAssetType } from '@constants/app/types'
import { musicAutocomplete, musicProviders, musicRelatedKeywords } from '@lib/music'
import { MusicFiltersType, MusicSearchParamSortType } from '@lib/music/types'
import { trans } from '@lib/utils'

const musicAsset: AppAssetType = {
   name: 'music',
   title: trans('elements.music.title'),
   hero: {
      bg: [
         {
            file: 'microphone.webp',
            placeholder:
               'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABVAAD/4QMyaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMSA3OS5jMDIwNGIyZGVmLCAyMDIzLzAyLzAyLTEyOjE0OjI0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFRkRERkM1M0Y1MDExMUVEODJBNkY4MDI3NDU1NUZFQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFRkRERkM1NEY1MDExMUVEODJBNkY4MDI3NDU1NUZFQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkVGRERGQzUxRjUwMTExRUQ4MkE2RjgwMjc0NTU1RkVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVGRERGQzUyRjUwMTExRUQ4MkE2RjgwMjc0NTU1RkVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwUDBAQEBAMFBQUGBgYFBQcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBQUHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgADgAZAwERAAIRAQMRAf/EAH0AAQADAQAAAAAAAAAAAAAAAAcEBggJAQEBAQEAAAAAAAAAAAAAAAAGBQQHEAABAwMDAwEJAAAAAAAAAAACAQQFEQMGABIHIRQIQTFhcdEikhNWGREAAQIEBAQHAQAAAAAAAAAAAQIDABEhBGESBQZBUfEiMYHBMlMUFxP/2gAMAwEAAhEDEQA/AOf3jhg1vkvjkJyNia4e2ct2UlKGopbZrfMR/Jcr12ihbl92uGasP5Xzdut0JcdPaOcd1sNSaFsp4JJSgVhk5HiMH4LhcpwiTmLJSTpWwtHjMhHuLBWQJUFevsqqLpNo+mIWsoUArIfSJOuaq4zbpcQSjPwwg5n/ADX4zwfjFZXCcKVYuOHsXT1CtJvugWyqJWqpXWC62ot+5KFOCZqBGm33q0xbApaNBInGCL+oln9YT7g+et/56fkid+kD44ufh1Lcnt/DTk9nHRV1xxtfEhmXlm9YEm4dqKEQiRoZLt6/QirofvBm0Vr1iVrk6D2CRqc1OEhXnKKe3ly0i5BE08cKRF8zXMK1xzAXONNhdTBRxjItnNzZtXYG0iK7Qa1r66W7EN19i6Do7M3aaY+cSN7i2+vbFv3yr49ILsRm4GJ4CypvmkLflYBytxG19rfsWRZu1Uq7xvXAUkQttNiF8PXSeSVX4KqLkJDpBNWZNjJMimZmesZpqelMF4//2Q=='
         },
         {
            file: 'piano.webp',
            placeholder:
               'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABVAAD/4QMyaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMSA3OS5jMDIwNGIyZGVmLCAyMDIzLzAyLzAyLTEyOjE0OjI0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFRkRERkM0QkY1MDExMUVEODJBNkY4MDI3NDU1NUZFQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFRkRERkM0Q0Y1MDExMUVEODJBNkY4MDI3NDU1NUZFQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM1NUQ2ODIwRjUwMTExRUQ4MkE2RjgwMjc0NTU1RkVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVGRERGQzRBRjUwMTExRUQ4MkE2RjgwMjc0NTU1RkVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwUDBAQEBAMFBQUGBgYFBQcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBQUHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgADgAZAwERAAIRAQMRAf/EAHkAAAIDAAAAAAAAAAAAAAAAAAcIAQYJAQADAQEAAAAAAAAAAAAAAAADBAUCBhAAAQMDAgQBDQAAAAAAAAAAAQIDBBEFBgAHIVESCBNxIqLSI5MUVBVVFxgJEQABBAIBBQEAAAAAAAAAAAABABECAyEEEkFRMhMFYf/aAAwDAQACEQMRAD8Awq2s2+n7kZZGxqCtDQdWhLrzyqJbQtYQVnnStdZtsjWHKY1dWd8mgHKPPcF2E3rYnMrbaWshiXrEJ8Zt765Ba8Nht9ytGVpU4o1oK1roVW5VI8Qcp/Y+Ns1wFkotFRF7i8v2rxn8a5JDt0y2RR4TUtDfU4UU4eceYGt6tFVEzxDE5KFft2WQHJiBhV/9oMO+xs+hqh7gkfahvsJGmzNz7VHhSTDWp5PVI6FuJTy6koBJFdTtsjgXTnyhM3DiSO7J69sYGOYpvrbrh3BzxlOzbrYavsCa05Bjsx1JPtWnJgbYJTx6gkkny01I1TUZDDFdp9KNorJgSzZft+dEFP6G4j2b4xugq99lWVnJcBnKUt6yy4dxiqtpPEoS/cGGUOIB4DoKhyJGrkJSPkFwd0YjxLpZPjo/yTXvG/W0RLZX/9k='
         },
         {
            file: 'drum.webp',
            placeholder:
               'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABVAAD/4QMyaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMSA3OS5jMDIwNGIyZGVmLCAyMDIzLzAyLzAyLTEyOjE0OjI0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxNUI4QURCQ0Y1MDIxMUVEODJBNkY4MDI3NDU1NUZFQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxNUI4QURCREY1MDIxMUVEODJBNkY4MDI3NDU1NUZFQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjE1QjhBREJBRjUwMjExRUQ4MkE2RjgwMjc0NTU1RkVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE1QjhBREJCRjUwMjExRUQ4MkE2RjgwMjc0NTU1RkVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwUDBAQEBAMFBQUGBgYFBQcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBQUHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgADgAZAwERAAIRAQMRAf/EAIMAAAMBAAAAAAAAAAAAAAAAAAMHCAQBAAMBAQAAAAAAAAAAAAAAAAIEBQYHEAAABAUCAwIPAAAAAAAAAAABAwQFEQIGBwgAEiExIiMJYXGB4UJiE5Mk1JVWF1cZEQAABQEGBgMAAAAAAAAAAAAAARECAwQhMRIiBRVhoRMjUxSx0Qb/2gAMAwEAAhEDEQA/AIquB3VWRmPFMLLq1EnKcretXxqoxMAlTAVJ1TcBEYhAB5DqO+Tq2XBuKnOElvGe19YWxq4hRW9HKkVJyNwFioIn4HG7YT7pA4AICPg1HrNA9gsLzsGo0r9R6DiewrSFBru9qzLqIlleaOrVHK0U8TOgQjISIbi5enrjNzgGs9No8hGcb5Hmlw12/wBLJHijharjVyneYN/aLP8A+80vu/PoNkf5X8voK77T+BgYGNle5ypbAq6fzUoZUqs2KTsn5xcGcuBG0YgqIFSBvLmOzxhroFQ1q5DHMqGR6dxvwIEzuarGPFcFqbTupDQ5bu3TthKlQTt9GEyOSaWPl05SqmYJVhqeW8MnF9lwiDH8xhuG8LhrEZppjH1ES4BA8RHdL7ACt8AH1YQ1OrD7lqCrRr0kJUAfxjhP+ynT6Sv+U0OLgQDDxMf/2Q=='
         },
         {
            file: 'mixing-board.webp',
            placeholder:
               'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABVAAD/4QMyaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMSA3OS5jMDIwNGIyZGVmLCAyMDIzLzAyLzAyLTEyOjE0OjI0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFRkRERkM0RkY1MDExMUVEODJBNkY4MDI3NDU1NUZFQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFRkRERkM1MEY1MDExMUVEODJBNkY4MDI3NDU1NUZFQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkVGRERGQzRERjUwMTExRUQ4MkE2RjgwMjc0NTU1RkVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVGRERGQzRFRjUwMTExRUQ4MkE2RjgwMjc0NTU1RkVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwUDBAQEBAMFBQUGBgYFBQcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBQUHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgADgAZAwERAAIRAQMRAf/EAIkAAAMBAQAAAAAAAAAAAAAAAAUGBwMIAQADAQEBAAAAAAAAAAAAAAADBAUGAQcQAAAFAwIDAw0AAAAAAAAAAAECAwQFEQYHABIxQQghYRdxkdFSohMzFNSVFlZXEQABAwIBCgUFAAAAAAAAAAABAAIDERIEITFBYaGx0SITBVGBkeFSI1MUVAb/2gAMAwEAAhEDEQA/ANMQ42wZZVtJ4Zk4AtnTtPlmcg1MVVu+EQ4FEOw3eGvdMGRhMkfKd6pXWilAR4IFkLpTyfYJD3Jj1YJG30BMomvEUUFMwgO7cj20GnGnm1dg/qZWt6cwDmHODmUqftOHe7qR1jeN6ibOxLcu2YVaXUipFvPfCq5kW5BBQ6gmqIKlMG4KjxrTV+TuWHxBbJHVrwLQAeUBSY4MRCKOo5ta10pm8CMcfsftKenQrsT+xsTH5Mf2iurLjh8FhMQcmjLoDa9BCBjF0HHx9o1EipiU3ba89Yc21FfJaM0QXEsPcsdl5F1hKYkJDH7l2v8AkTV23WTQaK89h3ZU9xa+puDQy1o05EPIqTmJp0aSzkGGZ3TWLu4TUSfQ5VVXZR5CdNiRQwh5Q0vGJLvok12LrNXskrwm6Iv6q9+zP/o9O9buPwHqOKPfqZs4r//Z'
         }
      ]
   },
   featuredKeywords: [
      'Inspirational',
      'Corporate',
      'Dance',
      'Classical',
      'Electronic',
      'Jazz',
      'Piano',
      'Instrumental'
   ],
   categories: {
      classical: {
         title: trans('filters.genre.classical'),
         keyword: 'classical',
         image: 'classical.webp'
      },
      pop: {
         title: trans('filters.genre.pop'),
         keyword: 'pop',
         image: 'pop.webp'
      },
      jazz: {
         title: trans('filters.genre.jazz'),
         keyword: 'jazz',
         image: 'jazz.webp'
      },
      rb: {
         title: trans('filters.genre.rb'),
         keyword: 'rb',
         image: 'rb.webp'
      },
      hipHopRap: {
         title: trans('filters.genre.hipHopRap'),
         keyword: 'rap',
         image: 'hip-hop-rap.webp'
      },
      electronic: {
         title: trans('filters.genre.electronic'),
         keyword: 'electronic',
         image: 'electronic.webp'
      },
      dance: {
         title: trans('filters.genre.dance'),
         keyword: 'dance',
         image: 'dance.webp'
      },
      rock: {
         title: trans('filters.genre.rock'),
         keyword: 'rock',
         image: 'rock.webp'
      },
      corporate: {
         title: trans('filters.genre.corporate'),
         keyword: 'corporate',
         image: 'corporate.webp'
      },
      lounge: {
         title: trans('filters.genre.lounge'),
         keyword: 'lounge',
         image: 'lounge.webp'
      },
      indian: {
         title: trans('filters.genre.indian'),
         keyword: 'indian',
         image: 'indian.webp'
      },
      tropical: {
         title: trans('filters.genre.tropical'),
         keyword: 'tropical',
         image: 'tropical.webp'
      }
   },
   providers: musicProviders,
   autocomplete: musicAutocomplete,
   relatedKeywords: musicRelatedKeywords,
   sort: <MusicSearchParamSortType>{
      newest: trans('sort.newest'),
      popular: trans('sort.popular'),
      relevant: trans('sort.relevant'),
      duration: trans('sort.duration'),
      tempo: trans('sort.tempo')
   },
   filters: <{ [K in keyof MusicFiltersType]: AppAssetFilterType }>{
      genre: {
         multiple: true,
         var: musicGenreFilter
      },
      instrument: {
         multiple: true,
         var: musicInstrumentFilter
      },
      minDuration: {
         var: musicDurationFilter
      },
      maxDuration: {
         var: musicDurationFilter
      },
      loopable: {
         var: musicLoopableFilter
      },
      mood: {
         multiple: true,
         var: musicMoodFilter
      },
      tempo: {
         var: musicTempoFilter
      },
      vocal: {
         var: musicVocalFilter
      }
   }
}

export default musicAsset
