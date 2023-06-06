import {
   AgeFilter,
   AuthenticFilter,
   CameraAngleFilter,
   ColorFilter,
   EthnicityFilter,
   ExcludeFilter,
   GenderFilter,
   LicenceFilter,
   MoodFilter,
   NumberOfPeopleFilter,
   OrientationFilter,
   PeopleFilter,
   SafeSearchFilter,
   StyleFilter,
   UndiscoveredFilter,
   UsageFilter
} from './filters'

const imageFilters = [
   OrientationFilter,
   ColorFilter,
   PeopleFilter,
   NumberOfPeopleFilter,
   AgeFilter,
   GenderFilter,
   EthnicityFilter,
   StyleFilter,
   MoodFilter,
   CameraAngleFilter,
   UsageFilter,
   LicenceFilter,
   UndiscoveredFilter,
   AuthenticFilter,
   SafeSearchFilter,
   ExcludeFilter
]

const ImageFilters = () => {
   return (
      <ul className="grid divide-y">
         {imageFilters.map((Component, key) => (
            <li key={key} className="px-5 pb-5 pt-3.5">
               <Component />
            </li>
         ))}
      </ul>
   )
}

export default ImageFilters
