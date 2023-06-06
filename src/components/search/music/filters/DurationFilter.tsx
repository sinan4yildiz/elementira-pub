import { musicDurationFilter } from '@components/search/music/filters/objects'
import RangeSlider from '@components/ui/RangeSlider'
import { trans } from '@lib/utils'
import { useRouter } from 'next/router'
import React from 'react'

const { name, label } = musicDurationFilter

const DurationFilter = () => {
   const { query } = useRouter()

   return (
      <>
         <label className="mb-2.5 inline-block inline-flex items-center gap-2 text-sm text-gray-500">
            {label}
            <span className="rounded bg-gray-100 px-1.5 pb-1 pt-0.5 text-xxs text-gray-500">
               {trans('common.seconds')}
            </span>
         </label>
         <RangeSlider
            minName="minDuration"
            maxName="maxDuration"
            min={0}
            max={600}
            step={5}
            dual={true}
            format="time"
            minValue={query.minDuration as never}
            maxValue={query.maxDuration as never}
         />
      </>
   )
}

export default DurationFilter
