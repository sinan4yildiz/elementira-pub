import { Footer, Header } from '@components/template'
import { ReactElement } from 'react'

type PropsType = {
   children: ReactElement
}

const IsolatedLayout = ({ children }: PropsType) => {
   return (
      <>
         <Header />
         <main>{children}</main>
         <Footer />
      </>
   )
}

export default IsolatedLayout
