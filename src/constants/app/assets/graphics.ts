import {
   graphicsColorFilter,
   graphicsExcludeFilter,
   graphicsFileTypeFilter,
   graphicsLicenceFilter,
   graphicsOrientationFilter,
   graphicsTypeFilter
} from '@components/search/graphics/filters/objects'
import { AppAssetFilterType, AppAssetType } from '@constants/app/types'
import { graphicAutocomplete, graphicProviders, graphicRelatedKeywords } from '@lib/graphics'
import { GraphicFiltersType, GraphicSearchParamSortType } from '@lib/graphics/types'
import { trans } from '@lib/utils'

const graphicAsset: AppAssetType = {
   name: 'graphics',
   title: trans('elements.graphics.title'),
   hero: {
      bg: [
         {
            file: 'spiral.webp',
            placeholder:
               'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABVAAD/4QMyaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMSA3OS5jMDIwNGIyZGVmLCAyMDIzLzAyLzAyLTEyOjE0OjI0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDNTVENjgxNkY1MDExMUVEODJBNkY4MDI3NDU1NUZFQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDNTVENjgxN0Y1MDExMUVEODJBNkY4MDI3NDU1NUZFQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZDNUE4RUZGRjUwMTExRUQ4MkE2RjgwMjc0NTU1RkVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZDNUE4RjAwRjUwMTExRUQ4MkE2RjgwMjc0NTU1RkVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwUDBAQEBAMFBQUGBgYFBQcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBQUHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgADgAZAwERAAIRAQMRAf/EAIgAAAIDAQAAAAAAAAAAAAAAAAUGAQIECQEAAgEFAAAAAAAAAAAAAAAABQcDAAIEBggQAAEBBgMECwAAAAAAAAAAAAIBABEDBAUGIRITQWGRFVFxgbHRMkKSFFQHEQABAwIDBgQHAAAAAAAAAAABAAIDEQQSEwUhQVFhkRQxodEG4SIyUiNTB//aAAwDAQACEQMRAD8A5mp+ZW7ZNYI6JNmssiuODHR6Km5W7tk9sW+izCWGTZwR7+Z+/Jbx+C4hLTv2I6tvIUFKhSlSNJL5hDEgXqZi6Zcw3bMUbgeIXQ3YAtzIfmaeoUwYYudtYi5gopomq+lD6GiwrIol2SOtCIc5AiFyO1VRCd38WXTcsxfm2BLXTxY5py8GPfRNdsaJmhUzMEz6hHEVTe7Diwm2hY2YGyeXO4AHzqKJm6O4H6RQ8vBFp3kcVctQywpvaULF/YD2YtvcX5bSWKjuNW+q2CTtSaSUB5fBY/jW79gvafg1Zl39o6hWdtp/7XdD6L//2Q=='
         },
         {
            file: 'shapes.webp',
            placeholder:
               'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABVAAD/4QMyaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMSA3OS5jMDIwNGIyZGVmLCAyMDIzLzAyLzAyLTEyOjE0OjI0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDNTVENjgxQUY1MDExMUVEODJBNkY4MDI3NDU1NUZFQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDNTVENjgxQkY1MDExMUVEODJBNkY4MDI3NDU1NUZFQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM1NUQ2ODE4RjUwMTExRUQ4MkE2RjgwMjc0NTU1RkVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkM1NUQ2ODE5RjUwMTExRUQ4MkE2RjgwMjc0NTU1RkVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwUDBAQEBAMFBQUGBgYFBQcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBQUHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgADgAZAwERAAIRAQMRAf/EAIcAAAIDAAAAAAAAAAAAAAAAAAgJBAUGAQACAwEAAAAAAAAAAAAAAAAFCAYHCQQQAAEDAgQEBAcAAAAAAAAAAAECAwQRBgASBQcxQRMUIZEICWFx0TJSVRcRAAECBAIHBgcAAAAAAAAAAAECAwARBAUhBjFBURJCEwfwcYGRFAhhobEiUsIV/9oADAMBAAIRAxEAPwArbZvZbNsjUmm3DACM3WCFFAHxIFBhYssdOrlZH+TWMKbUDr0ecN5QXm23ohdI+hyexQn5QGHuXuWdvbosCFdetx42lMurLMIqBdKkApzEfMmmNXPa7QO2ilW8hslS8J/CFq9xDlzrLtR2W3tEk/etUsB2n8oBU+nOz4KpJtp5yRNUD2xVUDNyFMOUMwvKlzAANcWBlvoo3Q25Tj7hVU7s8NAih/ke4P61eO/+xT/lED5R2Q5n1o7l+4rcu2Dsbb3bjTrb20Wk9/J0fVLfmPtt04ZYctavIHGbXTFiiTXrXfXATwJUDLxJEoJ5Os2Smqhr0FcXHZ8CHR+gw74VjuMzcAvsLvx543NkFES0kKy15GlOOHpyoulNEPRJSGZ8JEpxe9cxSpuAJcJdloIM5eIiVpKpvXa7RJ7rMnp0p91fDBZ7dkZ6IlzJO6ZjCWPdGo6m4n4HzZ+uBMqbb9YATtGxEf/Z'
         },
         {
            file: 'pyramid-art.webp',
            placeholder:
               'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABVAAD/4QMyaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMSA3OS5jMDIwNGIyZGVmLCAyMDIzLzAyLzAyLTEyOjE0OjI0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDNTVENjgxRUY1MDExMUVEODJBNkY4MDI3NDU1NUZFQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDNTVENjgxRkY1MDExMUVEODJBNkY4MDI3NDU1NUZFQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM1NUQ2ODFDRjUwMTExRUQ4MkE2RjgwMjc0NTU1RkVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkM1NUQ2ODFERjUwMTExRUQ4MkE2RjgwMjc0NTU1RkVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwUDBAQEBAMFBQUGBgYFBQcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBQUHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgADgAZAwERAAIRAQMRAf/EAH0AAQEBAQAAAAAAAAAAAAAAAAYEBwgBAAICAwAAAAAAAAAAAAAAAAIFAQcAAwQQAAAEBAQEBwAAAAAAAAAAAAECAwQAEQUGMRIUByGCExVRYZGh0pNVEQABAwIEBAcAAAAAAAAAAAABAAIDERIhQVEEMXGxBYGRodFSEwb/2gAMAwEAAhEDEQA/AOUN0HjXVKTMA+c4syYKtdpOiVctKsUjbhpum5ylt187NTmwiYJmUIYxRGWMpkN6QpfOGutT2MEiqDvq4kocTT4wLpUQwUvdQ8QgLkVFqN63PuW/amc1m2kGNTCeZuLtgoQeZJUwe8dcku5zYPMe6ZQ7D8++K9u4LZPiWuIPiGnqiFdu+/T2qxSq9pGJSOsfQKrPmos9RIc+QOrlzSnhxhc97r8Wi7mFMIgLR9fDNG39wv1kgKe30UVQxFJ00NMeVSIuk0Ta/tZYA5tDqCoe71n8kv3t/nGXP06LRTt2p9V//9k='
         }
      ]
   },
   featuredKeywords: ['Art', '3D', 'Logo', 'Advertising', 'Banner', 'Abstract', 'Flowers'],
   categories: {
      art: {
         title: trans('categories.art'),
         keyword: 'art',
         image: 'art.webp'
      },
      '3d': {
         title: trans('categories.3d'),
         keyword: '3d',
         image: '3d.webp'
      },
      logo: {
         title: trans('filters.category.logo'),
         keyword: 'logo',
         image: 'logo.webp'
      },
      advertising: {
         title: trans('categories.advertising'),
         keyword: 'advertising',
         image: 'sale.webp'
      },
      banner: {
         title: trans('filters.category.banner'),
         keyword: 'banner',
         image: 'banner.webp'
      },
      abstract: {
         title: trans('categories.abstract'),
         keyword: 'abstract',
         image: 'abstract.webp'
      },
      city: {
         title: trans('categories.city'),
         keyword: 'city',
         image: 'city-vector.webp'
      },
      waves: {
         title: trans('categories.waves'),
         keyword: 'waves',
         image: 'waves.webp'
      }
   },
   providers: graphicProviders,
   autocomplete: graphicAutocomplete,
   relatedKeywords: graphicRelatedKeywords,
   sort: <GraphicSearchParamSortType>{
      newest: trans('sort.newest'),
      popular: trans('sort.popular'),
      relevant: trans('sort.relevant'),
      random: trans('sort.random'),
      editorsChoice: trans('sort.editorsChoice')
   },
   filters: <{ [K in keyof GraphicFiltersType]: AppAssetFilterType }>{
      type: {
         var: graphicsTypeFilter
      },
      fileType: {
         multiple: true,
         var: graphicsFileTypeFilter
      },
      color: {
         var: graphicsColorFilter
      },
      exclude: {
         var: graphicsExcludeFilter
      },
      licence: {
         var: graphicsLicenceFilter
      },
      orientation: {
         var: graphicsOrientationFilter
      }
   }
}

export default graphicAsset
