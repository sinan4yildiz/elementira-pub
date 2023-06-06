import { videoDurationFilter } from '@components/search/video/filters/objects'
import RangeSlider from '@components/ui/RangeSlider'
import { useRouter } from 'next/router'
import React from 'react'

const { name, label } = videoDurationFilter

const DurationFilter = () => {
   const { query } = useRouter()

   return (
      <>
         <label className="mb-2.5 inline-block inline-flex items-center gap-2 text-sm text-gray-500">{label}</label>
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
