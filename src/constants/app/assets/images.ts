import {
   imagesAgeFilter,
   imagesAuthenticFilter,
   imagesCameraAngleFilter,
   imagesColorFilter,
   imagesEthnicityFilter,
   imagesExcludeFilter,
   imagesGenderFilter,
   imagesLicenceFilter,
   imagesMoodFilter,
   imagesNumberOfPeopleFilter,
   imagesOrientationFilter,
   imagesPeopleFilter,
   imagesSafeSearchFilter,
   imagesStyleFilter,
   imagesUndiscoveredFilter,
   imagesUsageFilter
} from '@components/search/images/filters/objects'
import { AppAssetFilterType, AppAssetType } from '@constants/app/types'
import { imageAutocomplete, imageProviders, imageRelatedKeywords } from '@lib/images'
import { ImageFiltersType, ImageSearchParamSortType } from '@lib/images/types'
import { trans } from '@lib/utils'

const imageAsset: AppAssetType = {
   name: 'images',
   title: trans('elements.images.title'),
   hero: {
      bg: [
         {
            file: 'beach.webp',
            placeholder:
               'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABVAAD/4QMyaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMSA3OS5jMDIwNGIyZGVmLCAyMDIzLzAyLzAyLTEyOjE0OjI0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyRjY5MDZDREY1MDIxMUVEODJBNkY4MDI3NDU1NUZFQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyRjY5MDZDRUY1MDIxMUVEODJBNkY4MDI3NDU1NUZFQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjJGNjkwNkNCRjUwMjExRUQ4MkE2RjgwMjc0NTU1RkVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjJGNjkwNkNDRjUwMjExRUQ4MkE2RjgwMjc0NTU1RkVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwUDBAQEBAMFBQUGBgYFBQcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBQUHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgADgAZAwERAAIRAQMRAf/EAIUAAQEBAAAAAAAAAAAAAAAAAAgHBgEAAgIDAAAAAAAAAAAAAAAABgcECAIFCRAAAQIEBAMFCQAAAAAAAAAAAQIDBAUGBwARIQgxIhNh0RKTFUJS0hQkVFUWCREAAQIEAwQLAAAAAAAAAAAAAQACERIDBCExBWGR0RNBUYGhwSJSUxUGB//aAAwDAQACEQMRAD8A1u1m6kFR1UoljyimXRICNdMidMsNPXrQXFGLcwqB/lf2M6TqElQwbUw7UlL27fZpulltPR5nYg5HTKhM4OAQ2lfWimudClk+zxzHbhSXTGtdK6OKvnYl15Qa9pHlQvvNt0ri+tynq9uvMG2JXL3HpfK4dDC0w/gYGSshw5ijXAncc24qmYkMaYbUZaJ9dGovLS9rSGxxUl/TaO+xlfkOfDib8VR9blj8E/3Ke9UuknIrrshtv60KzZIKeY56DjiyVOEhjkuSlYEVRIcYjennthmdb+gw6ZrLXCktDqKU6xygDXTx8CMKLX2UOYYO6cM10C/LbjUDZs5tMgS4xLeKLP8AUR3cO1VMGxZ5qIdt9EId+Zflxh0swjgGuQKgtaifdBwOXjaZaIGD/BMRxuA8yxl2Z8UCfTb+/knPIX3Y1Ures96iYr//2Q=='
         },
         {
            file: 'cappadocia.webp',
            placeholder:
               'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABVAAD/4QMyaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMSA3OS5jMDIwNGIyZGVmLCAyMDIzLzAyLzAyLTEyOjE0OjI0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2QzVBOEVGREY1MDExMUVEODJBNkY4MDI3NDU1NUZFQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2QzVBOEVGRUY1MDExMUVEODJBNkY4MDI3NDU1NUZFQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZDNUE4RUZCRjUwMTExRUQ4MkE2RjgwMjc0NTU1RkVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZDNUE4RUZDRjUwMTExRUQ4MkE2RjgwMjc0NTU1RkVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwUDBAQEBAMFBQUGBgYFBQcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBQUHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgADgAZAwERAAIRAQMRAf/EAIIAAAIDAAAAAAAAAAAAAAAAAAYHBQgJAQADAAMAAAAAAAAAAAAAAAADBAUAAgYQAAEEAAQDAw0AAAAAAAAAAAECAwQFABEGByExEhYICWGBIlITkxRU1BWVF1cRAAEDAwIDCQAAAAAAAAAAAAEAEQISAwQxUiFxFEFRYZGh0SITBf/aAAwDAQACEQMRAD8A0rq59DpjT6rOelLcJhIU70qBUkE5cueIs8xg5RrOBUREIf3c7z2z+zIqu100NquD0wwkFXVmMxywOedGMaiWCbx/xrt6ZjEEkdymLyRX6q0em0gn2PxjQdZeKc8kq4g5HyYJbyzKLpS9giEzE8WS47KN/Oj3KcZ1NzctOjtbPVUS2Q1d4mNXuMiXP0pOs9WqCvvsW3mQGa9II4ZF99LPA+qo4iTE6yX5BdzHpjaA08Rr7o470G5HeRuNIUEXf/bqJUx27BlVRJg21S867IDnoJQmJIcUEk88wBlz4YWyjOjiAya/Nt2RdJhKVTHsOibsndDvzK0owit2zeTXIjIEda7ajIcR0cCAJeY8+D45vsHZlPyoYFUvkX5FAP7S8QH+Yr/L0f1eKDlTPrxtx8l//9k='
         },
         {
            file: 'city.webp',
            placeholder:
               'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABVAAD/4QMyaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMSA3OS5jMDIwNGIyZGVmLCAyMDIzLzAyLzAyLTEyOjE0OjI0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxNUI4QURDMEY1MDIxMUVEODJBNkY4MDI3NDU1NUZFQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyRjY5MDZDQUY1MDIxMUVEODJBNkY4MDI3NDU1NUZFQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjE1QjhBREJFRjUwMjExRUQ4MkE2RjgwMjc0NTU1RkVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE1QjhBREJGRjUwMjExRUQ4MkE2RjgwMjc0NTU1RkVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwUDBAQEBAMFBQUGBgYFBQcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBQUHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgADgAZAwERAAIRAQMRAf/EAIQAAAEFAAAAAAAAAAAAAAAAAAUCBAYHCAEAAgIDAAAAAAAAAAAAAAAAAwQFBgECBxAAAQMDAgQCCwAAAAAAAAAAAQIDBBEFBgAHIRITCTFRQWGBktOUFVVWCBkRAAECBQIEBgMAAAAAAAAAAAEAAhESAwQFIWExQVEicaHRMlITFBUW/9oADAMBAAIRAxEAPwCd2bvLb1lbERyLAhOSCGaUJSPUSNXOpj7Roi6dVChkL95Ev16pd37yX7CRJ7kBlUV+3x+BdipUpKPPmp4aXt7Sxf7phFO3d7kaI7Ax0OKbYv3gd58relJjzWWYMZClPTFtr5AfGhrTR7rH46AAa4krSxy2TJdOKbQBx6lCf7G7m/kUL3Tov6HF/FyU/rcx0pLCUO7bjXF+2HMbU1b4QkEkMvsulRpwB6KlaDVNSTdZotpz6nTZF2HsmuMLILfiDTtuiroblPJQ6lsD0IQ2VLJI8k6RvC3tj7uSlbAPE8mrecUdxG75PE2oyJES0pldMoSyovRUdVHKKqIWsEe2mk2Mf94Mx8IFSlSsz8ZwkEYcYj1VG/X5v2Fn5mN8TVo13XPYjbyX/9k='
         },
         {
            file: 'lake.webp',
            placeholder:
               'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABVAAD/4QMyaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMSA3OS5jMDIwNGIyZGVmLCAyMDIzLzAyLzAyLTEyOjE0OjI0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxNUI4QURCOEY1MDIxMUVEODJBNkY4MDI3NDU1NUZFQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxNUI4QURCOUY1MDIxMUVEODJBNkY4MDI3NDU1NUZFQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjE1QjhBREI2RjUwMjExRUQ4MkE2RjgwMjc0NTU1RkVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE1QjhBREI3RjUwMjExRUQ4MkE2RjgwMjc0NTU1RkVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwUDBAQEBAMFBQUGBgYFBQcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBQUHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgADgAZAwERAAIRAQMRAf/EAIgAAAIDAAAAAAAAAAAAAAAAAAcIAwUJAQACAwAAAAAAAAAAAAAAAAAEBQEGBxAAAAUDAgQDCQEAAAAAAAAAAQIDBAURBgcACCExEhNRcRZBMiOT0xSUVVYZEQABAwIEAQkJAAAAAAAAAAABEQIEAAMhMRIFF0FRkaEikrLSFXGBMlIzFFRkB//aAAwDAQACEQMRAD8AXPZnmLMmBLal5PGcl1W+qr3Zm2zm6TmMnQAcAPjQAqHIfPVvgTGPuDU0451SZloG3mFGS1oZinfVFvLRh5DJp4+Uj5AhDncVFNyiAgFeHGoBXno2VPvxXkNUA5HkoGNskCWwOcij4hy1X39vv2zxc8/jXKv3kSkXrbnjkRUETCHuCIV5aQO/pr4jPqjWDiKdcPdvuXD2ToTA0O/9FNr36mQ+QOp4wzebqNTw52n5j01nbgv17JNnKEl3Y6CKImfLp/FXOavEpgTExgL48NXrb7ip2Wp7RWQbjaS4TreXphg7Lnyp7sNv1mFqQjmfZM39rJdoEWzYzFMFqUoJjuFCiWvtroqfGtPcTduhrkwCFB0A0Ts8u+xjRbslzARqOpqk+8jrqXKN4baS3pJu75tFiY50SgDRs/YlFMKc+pJUSCbyGus/nwtqNkC5fthy4nSV8K1pUSfKEhx+3eWoEGpqeJKFfrDYP/IuPzkvq6T+m7Z+U3uv8tMvVP1Hd5nnr//Z'
         },
         {
            file: 'camels.webp',
            placeholder:
               'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABVAAD/4QMyaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMSA3OS5jMDIwNGIyZGVmLCAyMDIzLzAyLzAyLTEyOjE0OjI0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2QzVBOEVGOUY1MDExMUVEODJBNkY4MDI3NDU1NUZFQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2QzVBOEVGQUY1MDExMUVEODJBNkY4MDI3NDU1NUZFQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZDNUE4RUY3RjUwMTExRUQ4MkE2RjgwMjc0NTU1RkVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZDNUE4RUY4RjUwMTExRUQ4MkE2RjgwMjc0NTU1RkVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgEBAQEBAgEBAgMCAQIDAwICAgIDAwMDAwMDAwUDBAQEBAMFBQUGBgYFBQcHCAgHBwoKCgoKDAwMDAwMDAwMDAECAgIEAwQHBQUHCggHCAoMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgADgAZAwERAAIRAQMRAf/EAIQAAQEBAQAAAAAAAAAAAAAAAAgFBAcBAAIDAQAAAAAAAAAAAAAAAAQFAQIHBhAAAAUCBAMECwAAAAAAAAAAAQIDBAUGBwARMRIhIghRgaET0TLSkxRUlBVXGAkRAAEDAgMHBAMAAAAAAAAAAAERAgMABDFREiFBYXGBoQXw0VITwSIy/9oADAMBAAIRAxEAPwDuFg+vmwF70zQtLzEkWtCpC4RiHqypBMJQ9XcI6jjE5PH3Nn/binA1pUM0UxRoC8qtXRvkaRtGvXtKvnULVceCpFCyLtQUW5y6gqXdx04Ys2eQnSpIPGmEVqzUFA2bqJttf6MVNITEtGX3r2QcwiiZmzJJiodNumYo5b8y83jhnPYT6B9ZK86i9ktC5WMQfmqH7iUX+SHH1CnpwDovPj3NLdLMqOvR5SNrY6vmj2kKseyNQ+cQUGabJ+kbzMuUDnVRKGXflgryst05iPYgTMYdDRHj22weEKnrSQ6iHVz1IWQ+9NU04AqZivt5yC3OIl4GV2GHIQ7BwH4tz2x7AoX1jTa4DTJihoEDDopTIEkpdNWndyoujNG65VMs+UA3l0x0zZpTiwjLaPekt01ifqQu/GsvwVuvnVfdm9nF/tm+Hce9L9EWZ71//9k='
         }
      ]
   },
   featuredKeywords: ['Spring', 'Summer', 'Landscape', 'Food', 'Animals', 'Business', 'Technology', 'Love'],
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
         image: 'autumn-2.webp'
      },
      abstract: {
         title: trans('categories.abstract'),
         keyword: 'abstract',
         image: 'abstract-2.webp'
      },
      animals: {
         title: trans('categories.animals'),
         keyword: 'animals',
         image: 'red-panda.webp'
      },
      babies: {
         title: trans('categories.babies'),
         keyword: 'babies',
         image: 'baby-2.webp'
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
         image: 'gym.webp'
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
   providers: imageProviders,
   autocomplete: imageAutocomplete,
   relatedKeywords: imageRelatedKeywords,
   sort: <ImageSearchParamSortType>{
      newest: trans('sort.newest'),
      popular: trans('sort.popular'),
      relevant: trans('sort.relevant'),
      random: trans('sort.random'),
      editorsChoice: trans('sort.editorsChoice')
   },
   filters: <{ [K in keyof ImageFiltersType]: AppAssetFilterType }>{
      age: {
         multiple: true,
         var: imagesAgeFilter
      },
      authentic: {
         var: imagesAuthenticFilter
      },
      cameraAngle: {
         var: imagesCameraAngleFilter
      },
      color: {
         var: imagesColorFilter
      },
      ethnicity: {
         multiple: true,
         var: imagesEthnicityFilter
      },
      exclude: {
         var: imagesExcludeFilter
      },
      gender: {
         var: imagesGenderFilter
      },
      licence: {
         var: imagesLicenceFilter
      },
      mood: {
         var: imagesMoodFilter
      },
      numberOfPeople: {
         var: imagesNumberOfPeopleFilter
      },
      orientation: {
         var: imagesOrientationFilter
      },
      people: {
         var: imagesPeopleFilter
      },
      safeSearch: {
         var: imagesSafeSearchFilter
      },
      style: {
         var: imagesStyleFilter
      },
      undiscovered: {
         var: imagesUndiscoveredFilter
      },
      usage: {
         var: imagesUsageFilter
      }
   }
}

export default imageAsset
