import { trans } from '@lib/utils'
import {
   VideoFilterType,
   VideoSearchParamAspectRatioType,
   VideoSearchParamFPSType,
   VideoSearchParamLicenceType,
   VideoSearchParamNumberOfPeopleType,
   VideoSearchParamPeopleType,
   VideoSearchParamResolutionType,
   VideoSearchParamSafeSearchType,
   VideoSearchParamUsageType
} from '@lib/video/types'

export const videoAspectRatioFilter: VideoFilterType<VideoSearchParamAspectRatioType> = {
   name: 'aspectRatio',
   label: trans('filters.aspectRatio.label'),
   options: [
      {
         value: '16:9',
         label: '16:9'
      },
      {
         value: '4:3',
         label: '4:3'
      },
      {
         value: 'nonStandard',
         label: trans('filters.aspectRatio.nonStandard')
      }
   ]
}

export const videoDurationFilter = {
   name: 'duration',
   label: trans('filters.duration.label')
}

export const videoExcludeFilter = {
   name: 'exclude',
   label: trans('filters.exclude.label')
}

export const videoFPSFilter: VideoFilterType<VideoSearchParamFPSType> = {
   name: 'fps',
   label: trans('filters.fps.label'),
   options: [
      {
         value: '23.98',
         label: '23.98'
      },
      {
         value: '24',
         label: '24'
      },
      {
         value: '25',
         label: '25'
      },
      {
         value: '29.97',
         label: '29.97'
      },
      {
         value: '30',
         label: '30'
      },
      {
         value: '50',
         label: '50'
      },
      {
         value: '59',
         label: '59'
      },
      {
         value: '60',
         label: '60'
      }
   ]
}

export const videoLicenceFilter: VideoFilterType<VideoSearchParamLicenceType> = {
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

export const videoNumberOfPeopleFilter: VideoFilterType<VideoSearchParamNumberOfPeopleType> = {
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

export const videoPeopleFilter: VideoFilterType<VideoSearchParamPeopleType> = {
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

export const videoResolutionFilter: VideoFilterType<VideoSearchParamResolutionType> = {
   name: 'resolution',
   label: trans('filters.resolution.label'),
   options: [
      {
         value: '4K',
         label: trans('filters.resolution.4K')
      },
      {
         value: 'HD',
         label: trans('filters.resolution.HD')
      },
      {
         value: 'SD',
         label: trans('filters.resolution.SD')
      }
   ]
}

export const videoSafeSearchFilter: VideoFilterType<VideoSearchParamSafeSearchType> = {
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

export const videoUsageFilter: VideoFilterType<VideoSearchParamUsageType> = {
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
