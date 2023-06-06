import { AllProvidersType } from '@lib/types'
import Image from 'next/image'
import React from 'react'

type PropsType = {
   provider: keyof AllProvidersType
   className?: string
}

const ProviderLogo = ({ provider, className }: PropsType) => {
   let classes = ['w-auto']

   if (className) classes.push(className)

   switch (provider) {
      case 'AdobeStock':
         classes.push('h-3')
         break

      case 'GettyImages':
         classes.push('h-3')
         break

      case 'iStockPhoto':
         classes.push('h-[13px]')
         break

      case 'Unsplash':
         classes.push('h-3.5')
         break

      case 'Pexels':
         classes.push('h-3.5')
         break

      case 'Pixabay':
         classes.push('h-[13px]')
         break

      case 'Freepik':
         classes.push('h-3.5')
         break

      case 'DepositPhotos':
         classes.push('h-3.5')
         break

      case 'Videvo':
         classes.push('h-[11px]')
         break

      case 'CreativeMarket':
         classes.push('h-3')
         break

      case 'EnvatoPhotos':
      case 'EnvatoGraphics':
      case 'EnvatoVideo':
      case 'EnvatoTemplates':
      case 'EnvatoMusic':
         classes.push('h-2.5')
         break

      case 'BigStockPhoto':
         classes.push('h-3')
         break

      case 'CanStockPhoto':
         classes.push('h-3')
         break

      case 'ShutterStock':
         classes.push('h-2.5')
         break

      case 'DreamsTime':
         classes.push('h-2.5')
         break

      case '_123RF':
         classes.push('h-[9px]')
         break
   }

   return (
      <Image
         src={`/assets/svg/providers/${provider}.svg`}
         alt={provider}
         className={classes.join(' ')}
         width={90}
         height={13}
         priority={false}
      />
   )
}

export default ProviderLogo
