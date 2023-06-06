import { SoundEffectFilterType, SoundEffectSearchParamCategoryType } from '@lib/soundEffects/types'
import { trans } from '@lib/utils'

export const soundEffectDurationFilter = {
   name: 'duration',
   label: trans('filters.duration.label')
}

export const soundEffectCategoryFilter: SoundEffectFilterType<SoundEffectSearchParamCategoryType> = {
   name: 'category',
   label: trans('filters.category.label'),
   options: [
      {
         value: 'animals',
         label: trans('filters.category.animals')
      },
      {
         value: 'ambiance',
         label: trans('filters.category.ambiance')
      },
      {
         value: 'game',
         label: trans('filters.category.game')
      },
      {
         value: 'transitions',
         label: trans('filters.category.transitions')
      },
      {
         value: 'human',
         label: trans('filters.category.human')
      },
      {
         value: 'urban',
         label: trans('filters.category.urban')
      },
      {
         value: 'nature',
         label: trans('filters.category.nature')
      },
      {
         value: 'futuristic',
         label: trans('filters.category.futuristic')
      },
      {
         value: 'communication',
         label: trans('filters.category.communication')
      },
      {
         value: 'crowd',
         label: trans('filters.category.crowd')
      },
      {
         value: 'magic',
         label: trans('filters.category.magic')
      },
      {
         value: 'interface',
         label: trans('filters.category.interface')
      },
      {
         value: 'cartoon',
         label: trans('filters.category.cartoon')
      },
      {
         value: 'industrial',
         label: trans('filters.category.industrial')
      },
      {
         value: 'misc',
         label: trans('filters.category.misc')
      },
      {
         value: 'alarm',
         label: trans('filters.category.alarm')
      },
      {
         value: 'laser',
         label: trans('filters.category.laser')
      },
      {
         value: 'mechanic',
         label: trans('filters.category.mechanic')
      },
      {
         value: 'vehicle',
         label: trans('filters.category.vehicle')
      },
      {
         value: 'voice',
         label: trans('filters.category.voice')
      },
      {
         value: 'water',
         label: trans('filters.category.water')
      }
   ]
}
