import { A } from '@components/common'
import { navigations } from '@constants/index'

const Footer = () => {
   return (
      <footer className="mt-auto border-t border-gray-300/75 px-4 max-lg:py-4">
         <ul className="grid place-items-center items-center justify-center max-lg:grid-cols-4 max-sm:grid-cols-2 lg:grid-flow-col">
            {Object.values(navigations.footer).map((link, key) => (
               <li key={key} className={`my-2 ${link.className ?? ''}`}>
                  <A
                     href={link.route}
                     className="block rounded-md px-3 py-2 text-sm text-gray-500 transition hover:bg-gray-200 hover:text-blue-600"
                  >
                     {link.label}
                  </A>
               </li>
            ))}
         </ul>
      </footer>
   )
}

export default Footer
