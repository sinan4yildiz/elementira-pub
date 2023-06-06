import { AppFilter, CategoryFilter } from './filters'

const templateFilters = [CategoryFilter, AppFilter]

const TemplateFilters = () => {
   return (
      <ul className="grid divide-y">
         {templateFilters.map((Component, key) => (
            <li key={key} className="px-5 pb-5 pt-3.5">
               <Component />
            </li>
         ))}
      </ul>
   )
}

export default TemplateFilters
