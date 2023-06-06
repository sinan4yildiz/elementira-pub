import {
   ImageFilterType,
   ImageSearchParamAgeType,
   ImageSearchParamAuthenticType,
   ImageSearchParamCameraAngleType,
   ImageSearchParamColorType,
   ImageSearchParamEthnicityType,
   ImageSearchParamGenderType,
   ImageSearchParamLicenceType,
   ImageSearchParamMoodType,
   ImageSearchParamNumberOfPeopleType,
   ImageSearchParamOrientationType,
   ImageSearchParamPeopleType,
   ImageSearchParamSafeSearchType,
   ImageSearchParamStyleType,
   ImageSearchParamUndiscoveredType,
   ImageSearchParamUsageType
} from '@lib/images/types'
import { trans } from '@lib/utils'

export const imagesAgeFilter: ImageFilterType<ImageSearchParamAgeType> = {
   name: 'age',
   label: trans('filters.age.label'),
   options: [
      {
         value: 'infants',
         label: trans('filters.age.infants')
      },
      {
         value: 'children',
         label: trans('filters.age.children')
      },
      {
         value: 'teenagers',
         label: trans('filters.age.teenagers')
      },
      {
         value: '20',
         label: '20'
      },
      {
         value: '30',
         label: '30'
      },
      {
         value: '40',
         label: '40'
      },
      {
         value: '50',
         label: '50'
      },
      {
         value: '60',
         label: '60'
      },
      {
         value: 'older',
         label: trans('filters.age.older')
      }
   ]
}

export const imagesAuthenticFilter: ImageFilterType<ImageSearchParamAuthenticType> = {
   name: 'authentic',
   label: trans('filters.authentic.label'),
   options: [
      {
         value: 'true',
         label: trans('common.yes')
      },
      {
         value: 'false',
         label: trans('common.no')
      }
   ]
}

export const imagesCameraAngleFilter: ImageFilterType<ImageSearchParamCameraAngleType> = {
   name: 'cameraAngle',
   label: trans('filters.cameraAngle.label'),
   options: [
      {
         value: 'headShot',
         label: trans('filters.cameraAngle.headShot')
      },
      {
         value: 'waistUp',
         label: trans('filters.cameraAngle.waistUp')
      },
      {
         value: 'threeQuarter',
         label: trans('filters.cameraAngle.threeQuarter')
      },
      {
         value: 'fullLength',
         label: trans('filters.cameraAngle.fullLength')
      },
      {
         value: 'lookingAtCamera',
         label: trans('filters.cameraAngle.lookingAtCamera')
      },
      {
         value: 'candid',
         label: trans('filters.cameraAngle.candid')
      },
      {
         value: 'closeUp',
         label: trans('filters.cameraAngle.closeUp')
      }
   ]
}

export const imagesColorFilter: ImageFilterType<ImageSearchParamColorType> = {
   name: 'color',
   label: trans('filters.color.label'),
   options: [
      {
         value: 'white',
         label: trans('filters.color.white'),
         color: '#ffffff'
      },
      {
         value: 'black',
         label: trans('filters.color.black'),
         color: '#000000'
      },
      {
         value: 'brown',
         label: trans('filters.color.brown'),
         color: '#bf7f35'
      },
      {
         value: 'yellow',
         label: trans('filters.color.yellow'),
         color: '#ffd60a'
      },
      {
         value: 'orange',
         label: trans('filters.color.orange'),
         color: '#ff5400'
      },
      {
         value: 'red',
         label: trans('filters.color.red'),
         color: '#ef233c'
      },
      {
         value: 'purple',
         label: trans('filters.color.purple'),
         color: '#7209b7'
      },
      {
         value: 'magenta',
         label: trans('filters.color.magenta'),
         color: '#db00b6'
      },
      {
         value: 'green',
         label: trans('filters.color.green'),
         color: '#80b918'
      },
      {
         value: 'teal',
         label: trans('filters.color.teal'),
         color: '#2a9d8f'
      },
      {
         value: 'blue',
         label: trans('filters.color.blue'),
         color: '#2464eb'
      }
   ]
}

export const imagesEthnicityFilter: ImageFilterType<ImageSearchParamEthnicityType> = {
   name: 'ethnicity',
   label: trans('filters.ethnicity.label'),
   options: [
      {
         value: 'african',
         label: trans('filters.ethnicity.african')
      },
      {
         value: 'africanAmerican',
         label: trans('filters.ethnicity.africanAmerican')
      },
      {
         value: 'black',
         label: trans('filters.ethnicity.black')
      },
      {
         value: 'brazilian',
         label: trans('filters.ethnicity.brazilian')
      },
      {
         value: 'chinese',
         label: trans('filters.ethnicity.chinese')
      },
      {
         value: 'caucasian',
         label: trans('filters.ethnicity.caucasian')
      },
      {
         value: 'eastAsian',
         label: trans('filters.ethnicity.eastAsian')
      },
      {
         value: 'hispanic',
         label: trans('filters.ethnicity.hispanic')
      },
      {
         value: 'japanese',
         label: trans('filters.ethnicity.japanese')
      },
      {
         value: 'indian',
         label: trans('filters.ethnicity.indian')
      },
      {
         value: 'middleEastern',
         label: trans('filters.ethnicity.middleEastern')
      },
      {
         value: 'nativeAmerican',
         label: trans('filters.ethnicity.nativeAmerican')
      },
      {
         value: 'pacificIslander',
         label: trans('filters.ethnicity.pacificIslander')
      },
      {
         value: 'southAsian',
         label: trans('filters.ethnicity.southAsian')
      },
      {
         value: 'southeastAsian',
         label: trans('filters.ethnicity.southeastAsian')
      },
      {
         value: 'white',
         label: trans('filters.ethnicity.white')
      },
      {
         value: 'multiracial',
         label: trans('filters.ethnicity.multiracial')
      },
      {
         value: 'other',
         label: trans('common.other')
      }
   ]
}

export const imagesExcludeFilter = {
   name: 'exclude',
   label: trans('filters.exclude.label')
}

export const imagesGenderFilter: ImageFilterType<ImageSearchParamGenderType> = {
   name: 'gender',
   label: trans('filters.gender.label'),
   options: [
      {
         value: 'female',
         label: trans('filters.gender.female')
      },
      {
         value: 'male',
         label: trans('filters.gender.male')
      },
      {
         value: 'nonBinary',
         label: trans('filters.gender.nonBinary')
      }
   ]
}

export const imagesLicenceFilter: ImageFilterType<ImageSearchParamLicenceType> = {
   name: 'licence',
   label: trans('filters.licence.label'),
   options: [
      {
         value: 'premium',
         label: trans('common.premium')
      },
      {
         value: 'free',
         label: trans('common.free')
      }
   ]
}

export const imagesMoodFilter: ImageFilterType<ImageSearchParamMoodType> = {
   name: 'mood',
   label: trans('filters.mood.label'),
   options: [
      {
         value: 'warm',
         label: trans('filters.mood.warm')
      },
      {
         value: 'cool',
         label: trans('filters.mood.cool')
      },
      {
         value: 'vivid',
         label: trans('filters.mood.vivid')
      },
      {
         value: 'natural',
         label: trans('filters.mood.natural')
      },
      {
         value: 'bold',
         label: trans('filters.mood.bold')
      },
      {
         value: 'dramatic',
         label: trans('filters.mood.dramatic')
      },
      {
         value: 'blackWhite',
         label: trans('filters.mood.blackWhite')
      }
   ]
}

export const imagesNumberOfPeopleFilter: ImageFilterType<ImageSearchParamNumberOfPeopleType> = {
   name: 'numberOfPeople',
   label: trans('filters.numberOfPeople.label'),
   options: [
      {
         value: '1',
         label: '1'
      },
      {
         value: '2',
         label: '2'
      },
      {
         value: '3',
         label: '3'
      },
      {
         value: '4',
         label: '4'
      },
      {
         value: 'more',
         label: '5+'
      }
   ]
}

export const imagesOrientationFilter: ImageFilterType<ImageSearchParamOrientationType> = {
   name: 'orientation',
   label: trans('filters.orientation.label'),
   options: [
      {
         value: 'horizontal',
         label: trans('filters.orientation.horizontal')
      },
      {
         value: 'vertical',
         label: trans('filters.orientation.vertical')
      },
      {
         value: 'square',
         label: trans('filters.orientation.square')
      },
      {
         value: 'panoramic',
         label: trans('filters.orientation.panoramic')
      }
   ]
}

export const imagesPeopleFilter: ImageFilterType<ImageSearchParamPeopleType> = {
   name: 'people',
   label: trans('filters.people.label'),
   options: [
      {
         value: 'true',
         label: trans('filters.people.true')
      },
      {
         value: 'false',
         label: trans('filters.people.false')
      }
   ]
}

export const imagesSafeSearchFilter: ImageFilterType<ImageSearchParamSafeSearchType> = {
   name: 'safeSearch',
   label: trans('filters.safeSearch.label'),
   options: [
      {
         value: 'true',
         label: trans('common.on')
      },
      {
         value: 'false',
         label: trans('common.off')
      }
   ]
}

export const imagesStyleFilter: ImageFilterType<ImageSearchParamStyleType> = {
   name: 'style',
   label: trans('filters.style.label'),
   options: [
      {
         value: 'selectiveFocus',
         label: trans('filters.style.selectiveFocus')
      },
      {
         value: 'pattern',
         label: trans('filters.style.pattern')
      },
      {
         value: 'vibrance',
         label: trans('filters.style.vibrance')
      },
      {
         value: 'grayish',
         label: trans('filters.style.grayish')
      },
      {
         value: 'isolated',
         label: trans('filters.style.isolated')
      },
      {
         value: 'transparent',
         label: trans('filters.style.transparent')
      }
   ]
}

export const imagesUndiscoveredFilter: ImageFilterType<ImageSearchParamUndiscoveredType> = {
   name: 'undiscovered',
   label: trans('filters.undiscovered.label'),
   options: [
      {
         value: 'true',
         label: trans('common.yes')
      },
      {
         value: 'false',
         label: trans('common.no')
      }
   ]
}

export const imagesUsageFilter: ImageFilterType<ImageSearchParamUsageType> = {
   name: 'usage',
   label: trans('filters.usage.label'),
   options: [
      {
         value: 'editorial',
         label: trans('filters.usage.editorial')
      },
      {
         value: 'nonEditorial',
         label: trans('filters.usage.nonEditorial')
      }
   ]
}
