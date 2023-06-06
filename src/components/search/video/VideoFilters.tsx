import {
   AspectRatioFilter,
   DurationFilter,
   ExcludeFilter,
   FpsFilter,
   LicenceFilter,
   NumberOfPeopleFilter,
   PeopleFilter,
   ResolutionFilter,
   SafeSearchFilter,
   UsageFilter
} from './filters'

const videoFilters = [
   ResolutionFilter,
   FpsFilter,
   AspectRatioFilter,
   DurationFilter,
   PeopleFilter,
   NumberOfPeopleFilter,
   UsageFilter,
   LicenceFilter,
   SafeSearchFilter,
   ExcludeFilter
]

const VideoFilters = () => {
   return (
      <ul className="grid divide-y">
         {videoFilters.map((Component, key) => (
            <li key={key} className="px-5 pb-5 pt-3.5">
               <Component />
            </li>
         ))}
      </ul>
   )
}

export default VideoFilters
