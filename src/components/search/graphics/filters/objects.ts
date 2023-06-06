import {
   GraphicFilterType,
   GraphicSearchParamColorType,
   GraphicSearchParamFileTypeType,
   GraphicSearchParamLicenceType,
   GraphicSearchParamOrientationType,
   GraphicSearchParamTypeType
} from '@lib/graphics/types'
import { trans } from '@lib/utils'

export const graphicsColorFilter: GraphicFilterType<GraphicSearchParamColorType> = {
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

export const graphicsExcludeFilter = {
   name: 'exclude',
   label: trans('filters.exclude.label')
}

export const graphicsFileTypeFilter: GraphicFilterType<GraphicSearchParamFileTypeType> = {
   name: 'fileType',
   label: trans('filters.fileType.label'),
   options: [
      {
         value: 'svg',
         label: trans('filters.fileType.svg')
      },
      {
         value: 'psd',
         label: trans('filters.fileType.psd')
      },
      {
         value: 'ai',
         label: trans('filters.fileType.ai')
      },
      {
         value: 'figma',
         label: trans('filters.fileType.figma')
      },
      {
         value: 'sketch',
         label: trans('filters.fileType.sketch')
      }
   ]
}

export const graphicsLicenceFilter: GraphicFilterType<GraphicSearchParamLicenceType> = {
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

export const graphicsTypeFilter: GraphicFilterType<GraphicSearchParamTypeType> = {
   name: 'type',
   label: trans('filters.type.label'),
   options: [
      {
         value: 'vectors',
         label: trans('filters.type.vectors')
      },
      {
         value: 'illustrations',
         label: trans('filters.type.illustrations')
      }
   ]
}

export const graphicsOrientationFilter: GraphicFilterType<GraphicSearchParamOrientationType> = {
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
